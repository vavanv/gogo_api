import express from 'express';
import cors from 'cors';

import { getMorgan, getLogger } from './logging';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();

    // new BotRoutes().routes(this.express, new BotRepository());

    // new CommonRoutes().routes(this.express);
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
