import { model, Schema, Model, Document } from 'mongoose';

export interface IShape extends Document {
  shape_id: number;
  shape_pt_lat: number;
  shape_pt_lon: number;
  shape_pt_sequence: number;
}

const ShapeSchema: Schema = new Schema({
  shape_id: { type: Number, index: true },
  shape_pt_lat: { type: Number },
  shape_pt_lon: { type: Number },
  shape_pt_sequence: { type: Number },
});

export const ShapeModel: Model<IShape> = model<IShape>('shapes', ShapeSchema);
