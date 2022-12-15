// http://goapi.openmetrolinx.com/OpenDataAPI/api/V1/ServiceataGlance/Trains/All?key=30020230

import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { TripResult, TripReturn } from '../model/Service';
import { ServiceRepository } from '../repository/ServiceRepository';
import { getDuration } from '../utils/duration';

export class ServiceRoutes {
  public routes = (express: express.Application, serviceRepository: ServiceRepository): void => {
    express.get('/api/V1/service/trains', async (_: Request, res: Response) => {
      try {
        const start = dayjs();
        const data: TripResult = await serviceRepository.getAllTrains();
        console.log(`trip result: ${getDuration(start)}`);
        const result: TripReturn[] = [];
        data?.Trips?.Trip?.forEach(t => {
          result.push({
            cars: t.Cars,
            tripNumber: t.TripNumber,
            startTime: t.StartTime,
            endTime: t.EndTime,
            lineCode: t.LineCode,
            routeNumber: t.RouteNumber,
            variantDir: t.VariantDir,
            display: t.Display,
            latitude: t.Latitude,
            longitude: t.Longitude,
            isInMotion: t.IsInMotion,
            delaySeconds: t.DelaySeconds,
            course: t.Course,
            firstStopCode: t.FirstStopCode,
            lastStopCode: t.LastStopCode,
            prevStopCode: t.PrevStopCode,
            nextStopCode: t.NextStopCode,
            atStationCode: t.AtStationCode,
            modifiedDate: t.ModifiedDate,
          });
        });
        console.log(`process time: ${getDuration(start)}`);
        res.status(200).json(result);
      } catch (e) {
        console.log(`error: ${e}`);
      }
    });
  };
}
