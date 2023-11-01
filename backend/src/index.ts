import express, { Request, Response, NextFunction, response } from 'express';
import cors from 'cors';
import { InputError, AccessError } from './error';
import {
  echoFunction,
  echoRetrieveFunction,
  joinSessionFunction
} from './service'

const PORT = 6969;

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));
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
    res.json('New Hello World!');
});

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

/* -------------------------------------------------------------------------- */
/*                                  Sessions                                  */
/* -------------------------------------------------------------------------- */
type PlayerConnection = {
  id: number,
  response: express.Response
}

type LiveSession = {
  id: string, // Db id
  wait_connections: PlayerConnection[],
  leaderboard_connections: PlayerConnection[]
}

// While a session is live there will be a mapping between its live-id and the db id stored here
let live_sessions: { [live_id: string]: LiveSession} = {};
let fake_db: string[] = ["JIm"];

app.post(
  '/create_session',
  errorHandler(async(req, res) => {
    // will return the join code and id
    // const { userID, liveID } = req.body;
    // if (liveID === undefined || liveID in live_sessions) {
    //   throw new InputError("Invalid SessionID")
    // }

    // const response = await createSessionFunction(userID)
    let new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    while (new_session_id in live_sessions) {
      new_session_id = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    }
    const new_session: LiveSession = {
      id: "pretend id",
      wait_connections: [],
      leaderboard_connections: []
    }
    live_sessions[new_session_id] = new_session
    for (let key in live_sessions) {
      console.log(`Session: ${key}, NumWaitConnection: ${live_sessions[key].wait_connections.length}`)
    }
    res.json({id: new_session_id})
  })
)

// Register the user in the backend session
app.get(
  '/join_session/:liveID/:name',
  errorHandler(async(req, res) => {
    const liveID = req.params.liveID
    const name = req.params.name
    fake_db.push(name)
    sendPlayerUpdate(liveID)
    res.json("Hi")
  }))

// 
function getPlayerUpdate(liveID: string) {
  console.log("Live", liveID)
  const users = fake_db
  return {"users": users}
}

function sendPlayerUpdate(liveID: string) {
  const sessionData = live_sessions[liveID]
  const users = getPlayerUpdate(liveID)
  sessionData.wait_connections.forEach(client => {
    console.log(`Sending to ${client.id}`);
    console.log(JSON.stringify(users))
    client.response.write(`data: ${JSON.stringify(users)}\n\n`)
  })
  console.log("Finished Sending")
}

app.get(
  '/session_wait_events/:liveID',
  errorHandler(async (req, res) => {
    const liveID = req.params.liveID
    console.log(req.body)
    if (!(liveID in live_sessions)){
      throw new InputError("Invalid Session Id")
    }

    res.writeHead(200, {
      'Content-Type': "text/event-stream",
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })

    const clientId = Date.now();
    const newClient = {
      id: clientId,
      response: res,
    }
    live_sessions[liveID].wait_connections.push(newClient)
    

    console.log("Sending", getPlayerUpdate(liveID))

    const data = getPlayerUpdate(liveID)
    res.write(`data: ${JSON.stringify(data)}\n\n`)
    

    console.log(`${clientId} joined session ${liveID}`);

    req.on('close', () => {
      console.log(`${clientId} Connection closed on ${liveID}`);
      live_sessions[liveID].wait_connections = live_sessions[liveID].wait_connections.filter(client => client.id !== clientId);
    })
  }),
);
  

app.post(
  '/start_session',
  errorHandler(async(req, res) => {

  })
)

app.post(
  '/end_session',
  errorHandler(async(req,res) => {

  })
)
/* -------------------------------------------------------------------------- */
/*                               Leaderboard                                  */
/* -------------------------------------------------------------------------- */

let clients: {id: number, response:any, sessionID: string}[] = [];

// Example function that triggers the leaderboard send
app.get('/fact', (req, res) => {
  sendLeaderBoardUpdate();
  res.json('Returned!');
});

function sendLeaderBoardUpdate() {
  clients.forEach(client => {
    console.log(`Sending to ${client.id}`);
    const data = {message: `Hello, world on Session ${client.sessionID} - (${new Date().toISOString()})`}
    client.response.write(`data: ${JSON.stringify(data)}\n\n`)
  })
  console.log("Finished Sending")
}

app.get(
  '/leaderboard_event/:sessionID',
  errorHandler(async (req, res) => {
    const sessionID: string = req.params.sessionID;
    if (sessionID === undefined) {
      throw new InputError("Invalid Session Id")
    }

    res.writeHead(200, {
      'Content-Type': "text/event-stream",
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })

    const clientId = Date.now();
    const newClient = {
      id: clientId,
      response: res,
      sessionID: req.params.sessionID
    }
    clients.push(newClient);
    console.log(`${clientId} Connection opened`);

    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    })
  }),
);



// Default route for unmatched routes
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

// Route Handlers End here

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
