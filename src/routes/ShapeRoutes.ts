import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { RouteRepository } from '../repository/RouteRepository';
import { TripRepository } from '../repository/TripRepository';
import { ShapeRepository } from '../repository/ShapeRepository';
import { getDuration } from '../utils/duration';
import { ShapeReturn } from '../model/Shape';

export class ShapeRoutes {
  public routes = (
    express: express.Application,
    routeRepository: RouteRepository,
    tripRepository: TripRepository,
    shapeRepository: ShapeRepository,
  ): void => {
    express.get('/api/V1/shapes', async (_: Request, res: Response) => {
      try {
        const start = dayjs();
        console.log(`start: ${start}`);

        const routes = await routeRepository.getRoutesByType(2);
        console.log(`routes time: ${getDuration(start)}`);

        const routeIds = routes.map(r => r.route_id);

        const trips = await tripRepository.getTripByRouteIds(routeIds);
        console.log(`trips time: ${getDuration(start)}`);

        const shapeIds = trips.map(t => t.shape_id);

        const shapes = await shapeRepository.getShapesByShapeIds(shapeIds);
        console.log(`shapes length: ${shapes.length}`);
        const result: ShapeReturn[] = [];
        shapes.forEach(s => {
          result.push({
            shapeId: s.shape_id,
            lat: s.shape_pt_lat,
            lon: s.shape_pt_lon,
            sec: s.shape_pt_sequence,
          });
        });
        console.log(`time: ${getDuration(start)}`);
        res.status(200).json(result);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  };
}
