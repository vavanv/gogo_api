import axios from 'axios';
import { API_URLS } from '../api/constants';
// import { environment } from '../environment';
// import { getLogger } from '../logging';
import { StationResult, StopResult } from '../model/Models';

// const logger = getLogger();

export class StationRepository {
  async getAllStops(): Promise<StationResult> {
    const url = `${process.env.OPEN_METROLINX_URL}${API_URLS.stops_all}?Key=${process.env.OPEN_METROLINX_KEY}`;
    // logger.info(`StationRepository - getAllStops -- url: ${url}`);
    return await (
      await axios.get(url)
    ).data;
  }

  async getStopDetailByCode(code: string): Promise<StopResult> {
    const url = `${process.env.OPEN_METROLINX_URL}${API_URLS.stop_detail}/${code}?Key=${process.env.OPEN_METROLINX_KEY}`;
    // logger.info(`StationRepository - getStopDetailByCode -- url: ${url}`);
    return await (
      await axios.get(url)
    ).data;
  }
}
