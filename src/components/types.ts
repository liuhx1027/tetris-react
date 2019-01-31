export interface ICell {
  isFilled: boolean;
}

export interface IRow {
  cells: ICell[];
}

export interface IBoard {
  rows: IRow[];
}
