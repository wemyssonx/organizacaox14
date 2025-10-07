import { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import { registerRoutes } from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  await registerRoutes(app);
})();

export default (req: IncomingMessage, res: ServerResponse) => {
  app(req, res);
};
