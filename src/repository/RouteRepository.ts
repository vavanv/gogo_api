import { connect } from '../database';
import { IRoute, RouteModel } from '../model/Route';

export class RouteRepository {
  constructor() {
    connect();
  }

  async getRoutesByType(type: number): Promise<IRoute[]> {
    console.log(`call getRoutesByType`);
    return await RouteModel.find({ route_type: type });
  }
}
