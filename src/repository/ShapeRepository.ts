import { connect } from '../database';
import { IShape, ShapeModel } from '../model/Shape';

export class ShapeRepository {
  constructor() {
    connect();
  }

  async getShapesByShapeIds(shapesIds: string[]): Promise<IShape[]> {
    return await ShapeModel.find({ shape_id: shapesIds }).sort([
      ['shape_id', 1],
      ['shape_pt_sequence', 1],
    ]);
  }
}
