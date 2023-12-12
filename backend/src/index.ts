import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { InputError, AccessError } from './error';
import {
  echoFunction,
  echoRetrieveFunction,
  login,
  register
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
/*                               Auth                                         */
/* -------------------------------------------------------------------------- */
app.post(
  '/auth/login',
  errorHandler(async (req, res) => {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json(token);
  }),
);

app.post(
  '/auth/register',
  errorHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await register(email, password, name);
    res.json(token);
  }),
);

/* -------------------------------------------------------------------------- */
/*                          Waiting Sessions                                  */
/* -------------------------------------------------------------------------- */

type LiveMapping = {
  dbId: string | null,
  live: boolean
}

const fakeDB: any = {}
const live_sessions: {[live_id: string]: LiveMapping} = {}

const waitNamespace = io.of('/wait')

const getWaitRoom = (session:string) => {
  return "wait" + session;
}

waitNamespace.on('connection', (socket) => {

  const user = socket.handshake.query.user
  const session: string = socket.handshake.query.session as string;
  const room = getWaitRoom(session)
  console.log(session)

  const emitWaitData = () => {
    waitNamespace.to(room).emit('data', fakeDB[session].users)
  }

  if (!(session in live_sessions)) {
    console.log("Bad Session")
    socket.disconnect()
  } else {
    socket.join(room);

    waitNamespace.to(room).emit("message", `Welcome user${user} to the session ${session}`)
  
    // Add user account to session
    console.log("Fake Db",fakeDB[session])
    fakeDB[session].users.push(user)
  
    // Emit all name data
    emitWaitData()
  }

  socket.on('disconnect', () => {
    // Remove user from session in db
    if (live_sessions[session].live === false) {
      
      fakeDB[session].users = fakeDB[session].users.filter((u: any) => u !== user)
    }

    console.log('user disconnected');
    waitNamespace.to(session).emit('message', 'A user has left the chat')
    // Emit all name data
    emitWaitData()
  });
  
});

app.post(
  '/create_session',
  errorHandler(async(req, res) => {
    // const response = await createSessionFunction(userID)
    let new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    while (new_session_id in live_sessions) {
      new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    }
    // Create the database and store the mapping 
    // TODO change right side for database id
    live_sessions[new_session_id] = {
      dbId: null,
      live: false
    };
    fakeDB[new_session_id] = {users: []}

    res.json({id: new_session_id})
  })
)

app.post(
  '/start_session',
  errorHandler(async(req, res) => {
    const { user, session } = req.body
    const room = getWaitRoom(session)
    // Verify that the given id is from the room owner
    if (!(session in live_sessions)) {
      throw new InputError("Unknown session name")
    }

    if (fakeDB[session].users[0] !== user) {
      throw new AccessError("Only the owner of the session can start the session")
    }

    // TODO: Create new session and assign db Id to dbId
    live_sessions[session].dbId = null;
  
    live_sessions[session].live = true;

    // Indicate that clients should change to new connection 
    waitNamespace.to(room).emit("start-session")

    // Close all connections related to the room
    waitNamespace.in(room).disconnectSockets()

    res.json({success: true})
  })
)



/* -------------------------------------------------------------------------- */
/*                             Live Sessions                                  */
/* -------------------------------------------------------------------------- */

const liveNamespace = io.of('/live')

const getLiveRoom = (session:string) => {
  return "live" + session;
}

liveNamespace.on('connection', (socket) => {

  const user = socket.handshake.query.user
  const session: string = socket.handshake.query.session as string;
  const room = getLiveRoom(session)

  const emitLeaderboardData = () => {
    // retrive session data from db
    // liveNamespace.to(room).emit('data', some data struc)
  }

  // Close the connection if there is no matching session in the database
  // Close the connection if the user is not in the list of users

  if (!(session in live_sessions)) {
    console.log("Bad Session")
    socket.disconnect()
  } else {
    socket.join(room);
    emitLeaderboardData();
  }

  socket.on('data', (data:any) => {
    // Assume that any data recieved on data will be adding a drink
    console.log(data)
  })

  socket.on('disconnect', () => {
    liveNamespace.to(room).emit('message', 'A user has left the chat')
    emitLeaderboardData();
  });
});

app.post(
  '/end_session',
  errorHandler(async(req, res) => {
    const { user, session } = req.body
    const waitRoom = getWaitRoom(session);
    const liveRoom = getLiveRoom(session);
    // Verify that the given id is from the room owner
    if (!(session in live_sessions)) {
      throw new InputError("Unknown session name")
    }

    if (fakeDB[session].users[0] !== user) {
      throw new AccessError("Only the owner of the session can end the session")
    }

    // Indicate that clients should change to new connection 
    waitNamespace.to(liveRoom).emit("end-session")
    //delete live_sessions[session]

    // Close all connections related to the room
    waitNamespace.in(liveRoom).disconnectSockets()

    res.json({success: true})
  })
)

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
