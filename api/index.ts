import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  await registerRoutes(app);
})();

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
