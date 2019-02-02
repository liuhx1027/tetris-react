import { ICell, IBoard } from "./types";

export type IBlock = {
  cells: ICell[];
  leftTopCell?: ICell;
  rightBottomCell?: ICell;
};

export class BlockHelper {
  private _rowCount: number;
  private _columnCount: number;

  constructor(ROW_COUNT, COLUMN_COUNT) {
    this._rowCount = ROW_COUNT;
    this._columnCount = COLUMN_COUNT;
  }

  getNewBlock(): IBlock {
    return {
      cells: [
        { columnIndex: 0, rowIndex: 0, isFilled: true, isBlock: true },
        { columnIndex: 1, rowIndex: 0, isFilled: true, isBlock: true },
        { columnIndex: 2, rowIndex: 0, isFilled: true, isBlock: true },
        { columnIndex: 0, rowIndex: 1, isFilled: true, isBlock: true }
      ],
      leftTopCell: {
        columnIndex: 0,
        rowIndex: 0,
        isFilled: true,
        isBlock: true
      },
      rightBottomCell: {
        columnIndex: 2,
        rowIndex: 1,
        isFilled: true,
        isBlock: true
      }
    };
  }

  clearBlock(board: IBoard) {
    board.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlock === true) {
          cell.isFilled = false;
          cell.isBlock = false;
        }
      });
    });
  }

  copyBlock(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return { ...cell };
      }),
      leftTopCell: block.leftTopCell ? { ...block.leftTopCell } : undefined,
      rightBottomCell: block.rightBottomCell
        ? { ...block.rightBottomCell }
        : undefined
    };
  }

  moveBlockUp(block: IBlock): IBlock {
    if (block.leftTopCell && block.leftTopCell.rowIndex <= 0) {
      return this.copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return { ...cell, rowIndex: Math.max(cell.rowIndex - 1, 0) };
      }),
      leftTopCell: block.leftTopCell
        ? {
            ...block.leftTopCell,
            rowIndex: Math.max(block.leftTopCell.rowIndex - 1, 0)
          }
        : undefined,
      rightBottomCell: block.rightBottomCell
        ? {
            ...block.rightBottomCell,
            rowIndex: Math.max(block.rightBottomCell.rowIndex - 1, 0)
          }
        : undefined
    };
  }
  moveBlockDown(block: IBlock): IBlock {
    if (
      block.rightBottomCell &&
      block.rightBottomCell.rowIndex >= this._rowCount - 1
    ) {
      return this.copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          rowIndex: Math.min(cell.rowIndex + 1, this._rowCount - 1)
        };
      }),
      leftTopCell: block.leftTopCell
        ? {
            ...block.leftTopCell,
            rowIndex: Math.min(
              block.leftTopCell.rowIndex + 1,
              this._rowCount - 1
            )
          }
        : undefined,
      rightBottomCell: block.rightBottomCell
        ? {
            ...block.rightBottomCell,
            rowIndex: Math.min(
              block.rightBottomCell.rowIndex + 1,
              this._rowCount - 1
            )
          }
        : undefined
    };
  }
  moveBlockRight(block: IBlock): IBlock {
    if (
      block.rightBottomCell &&
      block.rightBottomCell.columnIndex >= this._columnCount - 1
    ) {
      return this.copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.min(cell.columnIndex + 1, this._columnCount - 1)
        };
      }),
      leftTopCell: block.leftTopCell
        ? {
            ...block.leftTopCell,
            columnIndex: Math.min(
              block.leftTopCell.columnIndex + 1,
              this._columnCount - 1
            )
          }
        : undefined,
      rightBottomCell: block.rightBottomCell
        ? {
            ...block.rightBottomCell,
            columnIndex: Math.min(
              block.rightBottomCell.columnIndex + 1,
              this._columnCount - 1
            )
          }
        : undefined
    };
  }
  moveBlockLeft(block: IBlock): IBlock {
    if (block.leftTopCell && block.leftTopCell.columnIndex <= 0) {
      return this.copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.max(cell.columnIndex - 1, 0)
        };
      }),
      leftTopCell: block.leftTopCell
        ? {
            ...block.leftTopCell,
            columnIndex: Math.max(block.leftTopCell.columnIndex - 1, 0)
          }
        : undefined,
      rightBottomCell: block.rightBottomCell
        ? {
            ...block.rightBottomCell,
            columnIndex: Math.max(block.rightBottomCell.columnIndex - 1, 0)
          }
        : undefined
    };
  }
}
