export interface ICell {
  isFilled: boolean;
  isBlock: boolean;
  rowIndex: number;
  columnIndex: number;
}

export interface IRow {
  cells: ICell[];
}

export interface IBoard {
  rows: IRow[];
}
