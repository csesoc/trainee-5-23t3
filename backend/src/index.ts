import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { InputError, AccessError } from './error';
import {
  echoFunction,
  echoRetrieveFunction
} from './service'
import { createServer } from 'http';

const PORT = 6969;

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});
app.use(express.json());

const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};

// Route Handlers Here
app.get('/', (req, res) => {
    res.json('Hello World!');
});


/* -------------------------------------------------------------------------- */
/*                          Waiting Sessions                                  */
/* -------------------------------------------------------------------------- */

const fakeDB: any = {}
const waiting_sessions: {[live_id: string]: string} = {}

const waitNamespace = io.of('/session')

waitNamespace.on('connection', (socket) => {

  const user = socket.handshake.query.user
  const session: string = socket.handshake.query.session as string;
  console.log(session)

  const emitData = () => {
    waitNamespace.to(session).emit('data', fakeDB[session].users)
  }

  if (!(session in waiting_sessions)) {
    console.log("Bad Session")
    socket.disconnect()
  } else {
    socket.join(session);

    waitNamespace.to(session).emit("message", `Welcome user${user} to the session ${session}`)
  
    // Add user account to session
    console.log("Fake Db",fakeDB[session])
    fakeDB[session].users.push(user)
  
    // Emit all name data
    emitData()
  
    socket.on('disconnect', () => {
      // Remove user from session in db
      fakeDB[session].users = fakeDB[session].users.filter((u: any) => u !== user)
  
      console.log('user disconnected');
      waitNamespace.to(session).emit('message', 'A user has left the chat')
      // Emit all name data
      emitData()
    });
  }
});

app.post(
  '/create_session',
  errorHandler(async(req, res) => {
    // const response = await createSessionFunction(userID)
    let new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    while (new_session_id in waiting_sessions) {
      new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    }
    // Create the database and store the mapping 
    waiting_sessions[new_session_id] = new_session_id;
    fakeDB[new_session_id] = {users: []}

    res.json({id: new_session_id})
  })
)

app.post(
  '/start_session',
  errorHandler(async(req, res) => {
    const { user, session } = req.body
    // Verify that the given id is from the room owner
    if (!(session in waiting_sessions)) {
      throw new InputError("Unknown session name")
    }

    if (fakeDB[session].users[0] !== user) {
      throw new AccessError("Only the owner of the session can start the session")
    }

    // Close all connections related to the room
    waitNamespace.to(session).emit("start-session")
    delete waiting_sessions[session]
    // waitNamespace.in(session).disconnectSockets()

    res.json({success: true})
  })
)

/* -------------------------------------------------------------------------- */
/*                          Waiting Sessions                                  */
/* -------------------------------------------------------------------------- */

app.post(
  '/echo',
  errorHandler(async (req, res) => {
    const { startup } = req.body;
    const response = await echoFunction(startup);
    res.json(response);
  }),
);

app.get(
  '/echo',
  errorHandler(async (req, res) => {
    const response = await echoRetrieveFunction();
    res.json(response);
  }),
);

// Default route for unmatched routes
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

// Route Handlers End here

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
