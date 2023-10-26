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

// Example Function
const echoFunction = async(startup: string) => {
    if (startup === '') {
        throw new InputError('startup can not be empty');
    }

    return { echo: 'i am an echo' };
}

export { echoFunction };