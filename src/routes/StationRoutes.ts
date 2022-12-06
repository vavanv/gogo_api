import express, { Request, Response } from 'express';
import dayjs from 'dayjs';

import { FacilityReturn, StopResult, StopReturn, ParkingReturn } from '../model/Stop';
import { Station, StationResult } from '../model/Station';
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
          const facilities: FacilityReturn[] = [];
          data.Stop.Facilities.map(f => {
            facilities.push({
              description: f.Description,
            });
          });
          const parkings: ParkingReturn[] = [];
          data.Stop.Parkings.map(p => {
            parkings.push({
              name: p.Name,
              parkSpots: p.ParkSpots,
            });
          });
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
            facilities: facilities,
            parkings: parkings,
          });
        }
      }
      console.log(`Whole process; ${getDuration(start)}`);
      res.status(200).json(result);
    });
  };
}
