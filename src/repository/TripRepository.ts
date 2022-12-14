import { connect } from '../database';
import { ITrip, TripModel } from '../model/Trip';

export class TripRepository {
  constructor() {
    connect();
  }

  async getTripByRouteIds(routeIds: string[]): Promise<ITrip[]> {
    return await TripModel.find({ route_id: routeIds });
  }

  async getFirstOneTripByRouteId(routeId: string): Promise<ITrip> {
    return (await TripModel.findOne({ route_id: routeId })) as ITrip;
  }
}
