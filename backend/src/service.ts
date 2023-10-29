import { PrismaClient } from '@prisma/client'
import { InputError } from './error';


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

const joinSessionFunction = async(userID: string, sessionID: string) => {
    await prisma.session.update({
        where: {
            id: sessionID
        },
        data: {
            participantIDs: {
                push: userID
            }
        }
    })
}

const leaderboardData = async(sessionID: string) => {
    const session = await prisma.session.findFirstOrThrow({
        where: {
            id: sessionID
        },
        include: {
            participants: true
        }
    })
}

export {joinSessionFunction, echoFunction, echoRetrieveFunction };