import axios from 'axios';
import { API_URLS } from '../api/constants';
import { environment } from '../environment';
import { getLogger } from '../logging';
import { StationResult } from '../model/Models';

const logger = getLogger();

export class StationRepository {
  async getAllStops(): Promise<StationResult> {
    const url = `${environment.openMetrolinxUrl}${API_URLS.stops_all}?Key=${environment.openMetrolinxKey}`;
    logger.info(`StationRepository - getAllStops -- url: ${url}`);
    return await (
      await axios.get(url)
    ).data;
  }

  async getStopDetailByCode(code: string): Promise<any> {
    const url = `${environment.openMetrolinxUrl}${API_URLS.stop_detail}/${code}?Key=${environment.openMetrolinxKey}`;
    logger.info(`StationRepository - getStopDetailByCode -- url: ${url}`);
    return await (
      await axios.get(url)
    ).data;
  }
}
