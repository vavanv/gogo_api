import axios from 'axios';
import { API_URLS } from '../api/constants';
import { TripResult } from '../model/Service';

export class ServiceRepository {
  async getAllTrains(): Promise<TripResult> {
    const url = `${process.env.OPEN_METROLINX_URL}${API_URLS.service_train_all}?Key=${process.env.OPEN_METROLINX_KEY}`;
    return await (
      await axios.get(url)
    ).data;
  }
}
