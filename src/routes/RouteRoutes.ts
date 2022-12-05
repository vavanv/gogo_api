import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { RouteRepository } from '../repository/RouteRepository';
import { TripRepository } from '../repository/TripRepository';
import { ShapeRepository } from '../repository/ShapeRepository';
import { getDuration } from '../utils/duration';

export class RouteRoutes {
  public routes = (
    express: express.Application,
    routeRepository: RouteRepository,
    tripRepository: TripRepository,
    shapeRepository: ShapeRepository,
  ): void => {
    express.get('/api/V1/routes', async (_: Request, res: Response) => {
      try {
        const start = dayjs();
        console.log(`start: ${start}`);
        const routes = await routeRepository.getRoutesByType(2);
        console.log(`routes: ${routes}`);
        console.log(`routes: ${getDuration(start)}`);
        const routeIds = routes.map(r => r.route_id);
        const trips = await tripRepository.getTripByRouteIds(routeIds);
        console.log(`trips: ${getDuration(start)}`);
        const shapeIds = trips.map(t => t.shape_id);
        const shapes = await (await shapeRepository.getShapesByShapeIds(shapeIds))
          .sort(s => s.shape_id)
          .sort(s => s.shape_pt_sequence);
        console.log(shapes);
        res.status(200).json(shapes);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  };
}
