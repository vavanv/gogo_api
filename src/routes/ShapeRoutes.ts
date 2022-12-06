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
        // console.log(`routes length: ${routes.length}`);
        console.log(`routes time: ${getDuration(start)}`);

        const routeIds = routes.map(r => r.route_id);
        // console.log(`routeIds length: ${routeIds.length}`);
        // console.log(`routeIds: ${routeIds}`);

        const trips = await tripRepository.getTripByRouteIds(routeIds);
        // console.log(`trips length: ${trips.length}`);
        // console.log(`trip: ${trips[0]}`);
        // console.log(`trip: ${trips[1]}`);
        // console.log(`trip: ${trips[2]}`);
        // console.log(`trip: ${trips[3]}`);
        // console.log(`trip: ${trips[4]}`);
        console.log(`trips time: ${getDuration(start)}`);

        const shapeIds = trips.map(t => t.shape_id);
        // console.log(`shapeIds length: ${shapeIds.length}`);
        // console.log(`shapeIds: ${shapeIds}`);

        const shapes = await shapeRepository.getShapesByShapeIds(shapeIds);
        console.log(`shapes length: ${shapes.length}`);
        const result: ShapeReturn[] = [];
        // shapes.sort(id => id.shape_id);
        // shapes.sort(sec => sec.shape_pt_sequence);
        shapes.map(s => {
          result.push({
            shapeId: s.shape_id,
            lat: s.shape_pt_lat,
            lon: s.shape_pt_lon,
            sec: s.shape_pt_sequence,
          });
        });
        console.log(`time: ${getDuration(start)}`);
        // console.log(shapes[0]);
        // console.log(shapes[1]);
        // console.log(shapes[2]);
        // console.log(shapes[3]);
        // console.log(shapes[4]);
        res.status(200).json(result);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  };
}
