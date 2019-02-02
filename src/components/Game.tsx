import React, { Component } from "react";
import Board from "./Board";
import { IBoard, ICell } from "./types";
import Cell from "./Cell";

const ROW_COUNT = 15;
const COLUMN_COUNT = 15;

interface IGameProps {}

interface IGameState {
  board: IBoard;
  currentBlock?: IBlock;
}

interface IBlock {
  cells: ICell[];
  leftTopCell?: ICell;
  rightBottomCell?: ICell;
}

class Game extends Component<IGameProps, IGameState> {
  constructor(props) {
    super(props);

    this.state = {
      board: {
        rows: new Array(ROW_COUNT).fill(1).map((_rowItem, rowIndex) => {
          return {
            cells: new Array(COLUMN_COUNT)
              .fill(1)
              .map((_columnItem, columnIndex) => {
                return {
                  isFilled: false,
                  rowIndex,
                  columnIndex,
                  isBlock: false
                };
              })
          };
        })
      },
      currentBlock: undefined
    };

    this._getNewBlock = this._getNewBlock.bind(this);
    this._calculateNewBoard = this._calculateNewBoard.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._clearBlock = this._clearBlock.bind(this);
  }

  _getNewBlock() {
    return {
      cells: [{ columnIndex: 0, rowIndex: 0, isFilled: true, isBlock: true }]
    };
  }

  _clearBlock(board: IBoard) {
    board.rows.forEach(row => {
      row.cells.forEach(cell => {
        if (cell.isBlock === true) {
          cell.isFilled = false;
          cell.isBlock = false;
        }
      });
    });
  }

  _moveBlockUp(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return { ...cell, rowIndex: Math.max(cell.rowIndex - 1, 0) };
      })
    };
  }
  _moveBlockDown(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          rowIndex: Math.min(cell.rowIndex + 1, ROW_COUNT - 1)
        };
      })
    };
  }
  _moveBlockRight(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.min(cell.columnIndex + 1, COLUMN_COUNT - 1)
        };
      })
    };
  }
  _moveBlockLeft(block: IBlock): IBlock {
    return {
      cells: block.cells.map(cell => {
        return {
          ...cell,
          columnIndex: Math.max(cell.columnIndex - 1, 0)
        };
      })
    };
  }

  _calculateNewBoard(newBoard: IBoard, block: IBlock): IBoard {
    block.cells.forEach(cell => {
      newBoard.rows[cell.rowIndex].cells[cell.columnIndex].isFilled = true;
      newBoard.rows[cell.rowIndex].cells[cell.columnIndex].isBlock = true;
    });
    return newBoard;
  }

  _handleKeydown(e) {
    console.log(e);
    switch (e.code) {
      case "ArrowDown":
        if (this.state.currentBlock === undefined) {
          const newBlock: IBlock = this._getNewBlock();
          this.setState({
            board: this._calculateNewBoard(this.state.board, newBlock),
            currentBlock: newBlock
          });
        } else {
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this._clearBlock(newBoard);
          const newBlock: IBlock = this._moveBlockDown(this.state.currentBlock);
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
      case "ArrowUp":
        {
          if (this.state.currentBlock === undefined) return;
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this._clearBlock(newBoard);
          const newBlock: IBlock = this._moveBlockUp(this.state.currentBlock);
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
      case "ArrowRight":
        {
          if (this.state.currentBlock === undefined) return;
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this._clearBlock(newBoard);
          const newBlock: IBlock = this._moveBlockRight(
            this.state.currentBlock
          );
          console.log(newBlock);
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
      case "ArrowLeft":
        {
          if (this.state.currentBlock === undefined) return;
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this._clearBlock(newBoard);
          const newBlock: IBlock = this._moveBlockLeft(this.state.currentBlock);
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeydown);
  }

  render() {
    return (
      <div className="game">
        <Board {...this.state.board} />
      </div>
    );
  }
}

export default Game;
