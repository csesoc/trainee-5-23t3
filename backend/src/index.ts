import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { InputError, AccessError } from './error';
import {
  echoFunction,
  echoRetrieveFunction
} from './service'
import { error } from 'console';

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

// Router to obtain the drinks upon adding
app.post(
  '/modal', 
  errorHandler(async (req, res) => {
    const { user } = req.body;
    
  }),
);

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
