import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { RouteRepository } from '../repository/RouteRepository';
import { TripRepository } from '../repository/TripRepository';
import { getDuration } from '../utils/duration';
import { RouteReturn } from '../model/Route';

export class RouteRoutes {
  public routes = (
    express: express.Application,
    routeRepository: RouteRepository,
    tripRepository: TripRepository,
  ): void => {
    express.get('/api/V1/routes', async (_: Request, res: Response) => {
      try {
        const start = dayjs();
        console.log(`start: ${start}`);

        const routes = await routeRepository.getRoutesByType(2);
        console.log(`routes time: ${getDuration(start)}`);
        console.log(`routes selected: ${routes.length}`);

        const result: RouteReturn[] = [];
        for (const route of routes) {
          const trip = await tripRepository.getFirstOneTripByRouteId(route.route_id);
          result.push({
            key: route.route_short_name + trip.shape_id,
            shortName: route.route_short_name,
            longName: route.route_long_name,
            color: route.route_color,
            headSign: trip.trip_headsign,
            shapeId: trip.shape_id,
          });
        }
        console.log(`time: ${getDuration(start)}`);
        res.status(200).json(result);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  };
}
