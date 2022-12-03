import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { Station, StationResult, StopResult, Stop } from '../model/Models';
import { StationRepository } from '../repository/StationRepository';
import { getDuration } from '../utils/duration';

export class StationRoutes {
  public routes = (express: express.Application, stationRepository: StationRepository): void => {
    express.get('/api/V1/stops', async (_: Request, res: Response) => {
      const start = dayjs();
      const result: Stop[] = [];
      const data: StationResult = await stationRepository.getAllStops();
      const stations: Station[] = data.Stations.Station.filter(
        station =>
          station.LocationType == 'Train Station' || station.LocationType == 'Train & Bus Station',
      );
      for (const station of stations) {
        const data: StopResult = await stationRepository.getStopDetailByCode(station.LocationCode);
        // console.log(data.Stop);
        result.push({
          Code: data.Stop.Code,
          StopName: data.Stop.StopName,
          Longitude: data.Stop.Longitude,
          Latitude: data.Stop.Latitude,
        });
      }
      console.log(getDuration(start));
      res.status(200).json(result);
    });
  };
}
