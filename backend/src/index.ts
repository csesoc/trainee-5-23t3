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

app.post(
  '/join_session',
  errorHandler(async(req, res) => {
    const { userID, sessionID } = req.body;
    const response = await joinSessionFunction(userID, sessionID)
    res.json(response)
  }))

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
