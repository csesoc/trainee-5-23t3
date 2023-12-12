import jwt, { JwtPayload } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
import { AccessError, InputError } from './error';

const JWT_SECRET = 'SipPlasma';

interface User {
    id: string;
}

let users: User[] = [];

/* -------------------------------------------------------------------------- */
/*                                Prisma                                      */
/* -------------------------------------------------------------------------- */

// Prisma Client
const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                               Functions                                    */
/* -------------------------------------------------------------------------- */

// Example Echo Function for adding to db
const echoFunction = async(startup: string) => {
    if (startup === '') {
        throw new InputError('startup can not be empty');
    }

    await prisma.echo.create({
        data: {
            echoString: startup
        }
    }) 

    return { echo: 'Success!' };
}

// Example Echo Function for retrieving from db
const echoRetrieveFunction = async() => {
    const allEcho = await prisma.echo.findMany()
    console.log(allEcho);
    return allEcho;
}

const getUserIdFromToken = (token: string) => {
    try {
      const { uId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (!(uId in users)) {
        throw new AccessError('Invalid token');
      }
      return uId;
    } catch {
      throw new AccessError('Invalid token');
    }
  };  

const getUserIdFromEmail = async(email: string) => {
    const getUser: User | null = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
    })
    return getUser;
} 

const login = async(email:string, password:string) => {
    if (!email) {
        throw new InputError('Must provide an email for user login');
    } else if (!password) {
        throw new InputError('Must provide a password for user login');
    }

    const uId = await getUserIdFromEmail(email);
    if (uId === null) {
        throw new InputError('Invalid email');
    } else {
        const res: {password: string} | null = await prisma.user.findUnique({
            where: {
                id: uId.id,
              },
              select: {
                password: true,
              },
        })

        if (res) {
            if (res.password !== password) {
                throw new InputError('Invalid password');
            } else {
                const token = jwt.sign({ uId }, JWT_SECRET, { algorithm: 'HS256', });
                return { token };
            }
        } else {
            throw new Error('Login failed...');
        }
    }
}

const register = async(email:string, password:string, name:string) => {
    if (!email) {
        throw new InputError('Must provide an email for user registration');
    } else if (!password) {
        throw new InputError('Must provide a password for user registration');
    } else if (!name) {
        throw new InputError('Must provide a name for user registration');
    } 
    
    const emailInUse = await getUserIdFromEmail(email);
    if (emailInUse) {
        throw new InputError('Email already in use...');
    }

    await prisma.user.create({
        data: {
            email: email,
            password: password,
            name: name
        }
    }).then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    const uId = getUserIdFromEmail(email);
    if (uId !== null) {
        const token = jwt.sign({ uId }, JWT_SECRET, { algorithm: 'HS256', });
        return { token };
    } else {
        throw new Error('User is not created successfully...');
    }
}

const createSession = async(session: string, users: string[]) => {
    const participants = [];
    for (const uId of users) {
        participants.push({id: uId});
    }

    const Info = [];
    for (const uId of users) {
        Info.push({
            participant: {
                connect: {
                    id: uId
                }
            },
            session: null,
            drinks: []
        });
    }

    const create = await prisma.session.create({
        data: {
            name: session,
            participants: {
                connect: participants
            }
        }
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    const sessionId = create.id;
    if (sessionId === null) {
        throw new Error('Session is not created successfully...');
    }

    for (const uId of users) {
        await prisma.sessionInfo.create({
            data: {
                participant: {
                    connect: {
                        id: uId
                    }
                },
                session: {
                    connect: {
                        id: sessionId
                    }
                }
            },
            include: {
                participant: true,
                session: true
            }
        }
        ).catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    }

    await prisma.$disconnect();
    return { sessionId };
    // await prisma.session.update({
    //     where: {
    //       id: sessionId,
    //     },
    //     data: {
    //         sessionInfo: {
    //             createMany: 
    //         }
    //     }
    // }).then(async () => {
    //     await prisma.$disconnect()
    // }).catch(async (e) => {
    //     console.error(e)
    //     await prisma.$disconnect()
    //     process.exit(1)
    // })
}

const checkSession = async(session: string) => {
    let leadboardInfo: any = {};

    const info = await prisma.session.findMany({
        select: {
            sessionInfo: {
                select: {
                    participant: {
                        select: { name: true }
                    },
                    drinks: true
                }
            }
        }, 
        where: {
            id: {
                equals: session
            }
        }
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    if (info === null) {
        throw new Error('Info is not retrived successfully...');
    } else if (info.length !== 1) {
        throw new Error('Info is not retrived properly...');
    }

    for (const i of info[0].sessionInfo) {
        const uName = i.participant.name;
        let score = 0;
        i.drinks.forEach(d => score += d.dRate);
        leadboardInfo[uName] = score;
    }

    return { leadboardInfo };
}

const addShot = async(user: string, session: string, drink: string, dRate: number) => {
    const infoId = await prisma.sessionInfo.findFirst({
        select: {
            id: true
        }, 
        where: {
            participantID: {
                equals: user
            },
            sessionId: {
                equals: session
            }
        }
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    if (infoId === null) {
        throw new Error('Info is not retrived successfully...');
    }

    const info = await prisma.shot.create({
        data: {
            user: {
                connect: { id: user }
            }, 
            session: {
                connect: infoId 
            }, 
            drink,
            dRate
        },
        include: {
            user: true,
            session: true
        }
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
}

export { echoFunction, echoRetrieveFunction, getUserIdFromToken, login, register, createSession, checkSession, addShot };