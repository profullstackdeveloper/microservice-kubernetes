import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import Env from '@src/common/Env';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/route-errors';
import { NodeEnvs } from '@src/common/constants';
import { PriceIndexController } from './controllers/PriceIndexController';
import { PriceIndexServiceInstance } from './application/services/ProductService';

/******************************************************************************
                                Variables
******************************************************************************/

const app = express();

const priceIndexController = new PriceIndexController(PriceIndexServiceInstance);

// **** Setup

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (Env.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (Env.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (Env.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

// Nav to users pg by default
app.get('/', (req: Request, res: Response) => {
  res.status(200).json(`OrderBook API: ${new Date().getTime()}`)
});

app.get('/price-index', priceIndexController.getPriceIndex.bind(priceIndexController));

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
