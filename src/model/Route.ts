import { model, Schema, Model, Document } from 'mongoose';

export interface IRoute extends Document {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_type: number;
  route_color: string;
  route_text_color: string;
}

const RouteSchema: Schema = new Schema({
  route_id: { type: String, index: true },
  agency_id: { type: String },
  route_short_name: { type: String },
  route_long_name: { type: String },
  route_type: { type: Number, index: true },
  route_color: { type: String },
  route_text_color: { type: String },
});

export const RouteModel: Model<IRoute> = model<IRoute>('routes', RouteSchema);
