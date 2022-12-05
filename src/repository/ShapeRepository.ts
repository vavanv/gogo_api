import { connect } from '../database';
import { IShape, ShapeModel } from '../model/Shape';

export class ShapeRepository {
  constructor() {
    connect();
  }

  async getShapesByShapeIds(shapesIds: number[]): Promise<IShape[]> {
    return await ShapeModel.find({ shape_id: shapesIds });
  }
}
