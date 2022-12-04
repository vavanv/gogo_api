import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { Station, StationResult, StopResult, StopReturn } from '../model/Models';
import { StationRepository } from '../repository/StationRepository';
import { getDuration } from '../utils/duration';

export class StationRoutes {
  public routes = (express: express.Application, stationRepository: StationRepository): void => {
    express.get('/api/V1/stops', async (_: Request, res: Response) => {
      const start = dayjs();
      const result: StopReturn[] = [];
      const data: StationResult = await stationRepository.getAllStops();
      console.log(`Station result: ${getDuration(start)}`);
      const stations: Station[] = data.Stations.Station.filter(
        station =>
          station.LocationType == 'Train Station' || station.LocationType == 'Train & Bus Station',
      );
      console.log(`Station ${getDuration(start)}`);
      for (const station of stations) {
        const data: StopResult = await stationRepository.getStopDetailByCode(station.LocationCode);
        if (data.Stop.Latitude !== null && data.Stop.Longitude !== null) {
          result.push({
            zoneCode: data.Stop.ZoneCode,
            streetNumber: data.Stop.StreetNumber,
            intersection: data.Stop.Intersection,
            code: data.Stop.Code,
            city: data.Stop.City,
            streetName: data.Stop.StreetName,
            stopName: data.Stop.StopName,
            longitude: Number(data.Stop.Longitude),
            latitude: Number(data.Stop.Latitude),
          });
        }
      }
      console.log(`Whole process; ${getDuration(start)}`);
      res.status(200).json(result);
    });
  };
}
