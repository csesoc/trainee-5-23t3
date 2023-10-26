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

export { echoFunction, echoRetrieveFunction };