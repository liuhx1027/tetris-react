import { ICell, IBoard, IBlock } from "./types";

export const ROW_COUNT = 20;
export const COLUMN_COUNT = 20;
export const INTERVAL = 500; //in miliseconds

export enum ShapeType {
  L,
  T,
  LR
}

//reverse L
export const SHAPE_LR: IBlock = {
  cells: [
    { columnIndex: 0, rowIndex: 0, isFilled: true, isBlock: true },
    { columnIndex: 1, rowIndex: 0, isFilled: true, isBlock: true },
    { columnIndex: 2, rowIndex: 0, isFilled: true, isBlock: true },
    { columnIndex: 0, rowIndex: 1, isFilled: true, isBlock: true }
  ],
  origin: { columnIndex: 1, rowIndex: 1, isFilled: false, isBlock: false },
  maxRadius: 1
};

// L
export const SHAPE_L: IBlock = {
  cells: [
    { columnIndex: 1, rowIndex: 0, isFilled: true, isBlock: true },
    { columnIndex: 1, rowIndex: 1, isFilled: true, isBlock: true },
    { columnIndex: 1, rowIndex: 2, isFilled: true, isBlock: true },
    { columnIndex: 0, rowIndex: 0, isFilled: true, isBlock: true }
  ],
  origin: { columnIndex: 1, rowIndex: 1, isFilled: false, isBlock: false },
  maxRadius: 1
};

// T
export const SHAPE_T: IBlock = {
  cells: [
    { columnIndex: 1, rowIndex: 0, isFilled: true, isBlock: true },
    { columnIndex: 0, rowIndex: 1, isFilled: true, isBlock: true },
    { columnIndex: 1, rowIndex: 1, isFilled: true, isBlock: true },
    { columnIndex: 2, rowIndex: 1, isFilled: true, isBlock: true }
  ],
  origin: { columnIndex: 1, rowIndex: 1, isFilled: false, isBlock: false },
  maxRadius: 1
};

export const ALL_SHAPES: Map<ShapeType, IBlock> = new Map<ShapeType, IBlock>([
  [ShapeType.L, SHAPE_L],
  [ShapeType.T, SHAPE_T],
  [ShapeType.LR, SHAPE_LR]
]);
