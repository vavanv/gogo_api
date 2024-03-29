import express from 'express';
import cors from 'cors';

import { getMorgan, getLogger } from './logging';
import { CommonRoutes } from './routes/CommonRoutes';
import { StationRoutes } from './routes/StationRoutes';
import { ShapeRoutes } from './routes/ShapeRoutes';
import { RouteRoutes } from './routes/RouteRoutes';
import { ServiceRoutes } from './routes/ServiceRoutes';
import { StationRepository } from './repository/StationRepository';
import { RouteRepository } from './repository/RouteRepository';
import { TripRepository } from './repository/TripRepository';
import { ShapeRepository } from './repository/ShapeRepository';
import { ServiceRepository } from './repository/ServiceRepository';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();

    new StationRoutes().routes(this.express, new StationRepository());
    new ShapeRoutes().routes(
      this.express,
      new RouteRepository(),
      new TripRepository(),
      new ShapeRepository(),
    );
    new ServiceRoutes().routes(this.express, new ServiceRepository());
    new RouteRoutes().routes(this.express, new RouteRepository(), new TripRepository());
    new CommonRoutes().routes(this.express);
  }

  private middleware(): void {
    this.express.use(getMorgan(getLogger()));
    this.express.use(cors());
    //Cors Configuration - Start
    // this.express.use((req: any, res: any, next: any) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested, Content-Type, Accept Authorization',
    //   );
    //   if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    //     return res.status(200).json({});
    //   }
    //   next();
    // });
    //Cors Configuration - End
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }
}

export default new App().express;
