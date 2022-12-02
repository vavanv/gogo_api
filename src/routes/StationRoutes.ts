import express, { Request, Response } from 'express';
import { Station, StationResult } from '../model/Models';
import { StationRepository } from '../repository/StationRepository';
import { getLogger } from '../logging';

const logger = getLogger();

export class StationRoutes {
  public routes = (express: express.Application, stationRepository: StationRepository): void => {
    express.get('/stops', async (_: Request, res: Response) => {
      const result: StationResult = await stationRepository.getAllStops();
      const stations: Station[] = result.Stations.Station.filter(
        s => s.LocationType == 'Train Station' || s.LocationType == 'Train & Bus Station',
      );
      // console.log(stations);
      for (const station of stations) {
        const ss = await stationRepository.getStopDetailByCode(station.LocationCode);
        console.log(ss);
      }
    });
  };
}

// export class StationRepository {
//   async getAllStops() :Promise<Station[]||[]> {
//     const url = `${environment.openMetrolinxUrl}${API_URLS.stops_all}?Key=${environment.openMetrolinxKey}`;
//     logger.info(`StationRepository - getAllStops -- url: ${url}`);
//     const res = axios.get(url);

//       // .then(result => {
//       //   const stops: Station[] = result.data.Stations.Station;
//       //   const start = dayjs();
//       //   const payload: Station[] = stops.filter(
//       //     s => s.LocationType == 'Train Station' || s.LocationType == 'Train & Bus Station',
//       //   );
//       //   logger.info(
//       //     `StationRoutes - /stops -- get ${payload.length} stops duration: ${getDuration(
//       //       start,
//       //     )} (ms)`,
//       //   );
//       //   return payload;
//       // })
//       // .catch(error => {
//       //   logger.error(`StationRoutes - /stops -- ${error}`);
//       //   return [];
//       // });
//   }
// }
