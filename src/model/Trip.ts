import { model, Schema, Model, Document } from 'mongoose';

export interface ITrip extends Document {
  route_id: string;
  service_id: number;
  trip_id: string;
  trip_headsign: string;
  trip_short_name: string;
  direction_id: number;
  block_id: string;
  shape_id: string;
  wheelchair_accessible: number;
  bikes_allowed: number;
  route_variant: number;
}

const TripSchema: Schema = new Schema({
  route_id: { type: String, index: true },
  service_id: { type: Number },
  trip_id: { type: String, index: true },
  trip_headsign: { type: String },
  trip_short_name: { type: String },
  direction_id: { type: Number },
  block_id: { type: String },
  shape_id: { type: String, index: true },
  wheelchair_accessible: { type: Number },
  bikes_allowed: { type: Number },
  route_variant: { type: Number },
});

export const TripModel: Model<ITrip> = model<ITrip>('trips', TripSchema);
