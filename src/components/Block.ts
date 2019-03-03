import { ICell, IBoard, IBlock } from "./types";
import * as CONSTS from "./const";

export class BlockHelper {
  private _rowCount: number;
  private _columnCount: number;

  constructor(ROW_COUNT, COLUMN_COUNT) {
    this._rowCount = ROW_COUNT;
    this._columnCount = COLUMN_COUNT;
  }

  getNewBlock(): IBlock {
    // T
    return CONSTS.SHAPE_L;
  }

  private _getLeftTopCell(block: IBlock): ICell {
    let columnIndex = this._columnCount;
    let rowIndex = this._rowCount;
    block.cells.forEach(cell => {
      if (columnIndex > cell.columnIndex) columnIndex = cell.columnIndex;
      if (rowIndex > cell.rowIndex) rowIndex = cell.rowIndex;
    });

    return {
      columnIndex,
      rowIndex,
      isFilled: false,
      isBlock: true
    };
  }

  private _getRightBottomCell(block: IBlock): ICell {
    let columnIndex = 0;
    let rowIndex = 0;
    block.cells.forEach(cell => {
      if (columnIndex < cell.columnIndex) columnIndex = cell.columnIndex;
      if (rowIndex < cell.rowIndex) rowIndex = cell.rowIndex;
    });

    return {
      columnIndex,
      rowIndex,
      isFilled: false,
      isBlock: true
    };
  }

  private _copyBlock(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return { ...cell };
      }),
      origin: { ...block.origin },
      maxRadius: block.maxRadius
    };
  }

  public clearBlock(board: IBoard) {
    board.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlock === true) {
          cell.isFilled = false;
          cell.isBlock = false;
        }
      });
    });
  }

  public moveBlockUp(block: IBlock): IBlock {
    const leftTopCell = this._getLeftTopCell(block);
    if (leftTopCell && leftTopCell.rowIndex <= 0) {
      return this._copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return { ...cell, rowIndex: Math.max(cell.rowIndex - 1, 0) };
      }),
      origin: { ...block.origin, rowIndex: block.origin.rowIndex - 1 },
      maxRadius: block.maxRadius
    };
  }
  public moveBlockDown(block: IBlock): IBlock {
    const rightBottomCell = this._getRightBottomCell(block);
    if (rightBottomCell.rowIndex >= this._rowCount - 1) {
      return this._copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          rowIndex: Math.min(cell.rowIndex + 1, this._rowCount - 1)
        };
      }),
      origin: { ...block.origin, rowIndex: block.origin.rowIndex + 1 },
      maxRadius: block.maxRadius
    };
  }
  public moveBlockRight(block: IBlock): IBlock {
    const rightBottomCell = this._getRightBottomCell(block);
    if (rightBottomCell.columnIndex >= this._columnCount - 1) {
      return this._copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.min(cell.columnIndex + 1, this._columnCount - 1)
        };
      }),
      origin: { ...block.origin, columnIndex: block.origin.columnIndex + 1 },
      maxRadius: block.maxRadius
    };
  }
  public moveBlockLeft(block: IBlock): IBlock {
    const leftTopCell = this._getLeftTopCell(block);
    if (leftTopCell && leftTopCell.columnIndex <= 0) {
      return this._copyBlock(block);
    }
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.max(cell.columnIndex - 1, 0)
        };
      }),
      origin: { ...block.origin, columnIndex: block.origin.columnIndex - 1 },
      maxRadius: block.maxRadius
    };
  }

  private _canRotate(block: IBlock): Boolean {
    console.log(block);
    return (
      block.origin.columnIndex + block.maxRadius <= this._columnCount - 1 &&
      block.origin.columnIndex - block.maxRadius >= 0 &&
      block.origin.rowIndex + block.maxRadius <= this._rowCount - 1 &&
      block.origin.rowIndex - block.maxRadius >= 0
    );
  }
  public rotateLeft(block: IBlock): IBlock {
    if (this._canRotate(block) === false) return this._copyBlock(block);

    return {
      origin: { ...block.origin },
      maxRadius: block.maxRadius,
      cells: block.cells.map(cell => {
        let x = cell.columnIndex;
        let y = cell.rowIndex;

        // Tranpose to cartersian system (minus the origin's offset).
        x -= block.origin.columnIndex;
        y -= block.origin.rowIndex;

        // Flip the y's sign (cartesian's y goes up, our implementation's y goes down).
        y = -y;

        // Apply transformation.
        // x' = x * cos(PI/2) - y * sin(PI/2)
        // y' = x * sin(PI/2) + y * cos(PI/2)
        // These formulas translate to more simple equations
        // as we are only rotation 90 degree chunks.
        // x' = -y
        // y' = x;
        let temp = x;
        x = -y;
        y = temp;

        // Flip the y's sign back to origin.
        y = -y;

        // Add origin offset back to coords.
        x += block.origin.columnIndex;
        y += block.origin.rowIndex;

        return {
          ...cell,
          rowIndex: y,
          columnIndex: x
        };
      })
    };
  }
  public rotateRight(block: IBlock): IBlock {
    if (this._canRotate(block) === false) return this._copyBlock(block);
    return {
      origin: { ...block.origin },
      maxRadius: block.maxRadius,
      cells: block.cells.map(cell => {
        let x = cell.columnIndex;
        let y = cell.rowIndex;

        // Tranpose to cartersian system (minus the origin's offset).
        x -= block.origin.columnIndex;
        y -= block.origin.rowIndex;

        // Apply transformation.
        // x' = x * cos(PI/2) - y * sin(PI/2)
        // y' = x * sin(PI/2) + y * cos(PI/2)
        // These formulas translate to more simple equations
        // as we are only rotation 90 degree chunks.
        // x' = -y
        // y' = x;
        let temp = x;
        x = -y;
        y = temp;

        // Add origin offset back to coords.
        x += block.origin.columnIndex;
        y += block.origin.rowIndex;

        return {
          ...cell,
          rowIndex: y,
          columnIndex: x
        };
      })
    };
  }
}
