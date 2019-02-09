import React, { Component } from "react";
import Board from "./Board";
import { IBlock, BlockHelper } from "./Block";
import { IBoard } from "./types";

const ROW_COUNT = 20;
const COLUMN_COUNT = 20;

interface IGameProps {}

interface IGameState {
  board: IBoard;
  currentBlock?: IBlock;
}

class Game extends Component<IGameProps, IGameState> {
  private blockHelper: BlockHelper;
  constructor(props) {
    super(props);

    this.blockHelper = new BlockHelper(ROW_COUNT, COLUMN_COUNT);
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

    this._calculateNewBoard = this._calculateNewBoard.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  _calculateNewBoard(newBoard: IBoard, block: IBlock): IBoard {
    block.cells.forEach(cell => {
      newBoard.rows[cell.rowIndex].cells[cell.columnIndex].isFilled = true;
      newBoard.rows[cell.rowIndex].cells[cell.columnIndex].isBlock = true;
    });
    return newBoard;
  }

  _handleKeydown(e) {
    switch (e.code) {
      case "ArrowDown":
        if (this.state.currentBlock === undefined) {
          const newBlock: IBlock = this.blockHelper.getNewBlock();
          this.setState({
            board: this._calculateNewBoard(this.state.board, newBlock),
            currentBlock: newBlock
          });
        } else {
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.moveBlockDown(
            this.state.currentBlock
          );
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
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.moveBlockUp(
            this.state.currentBlock
          );
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
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.moveBlockRight(
            this.state.currentBlock
          );
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
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.moveBlockLeft(
            this.state.currentBlock
          );
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
      case "KeyA":
        {
          if (this.state.currentBlock === undefined) return;
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.rotateLeft(
            this.state.currentBlock
          );
          this.setState({
            board: this._calculateNewBoard(newBoard, newBlock),
            currentBlock: newBlock
          });
        }
        break;
      case "KeyD":
        {
          if (this.state.currentBlock === undefined) return;
          const newBoard: IBoard = JSON.parse(JSON.stringify(this.state.board));
          this.blockHelper.clearBlock(newBoard);
          const newBlock: IBlock = this.blockHelper.rotateRight(
            this.state.currentBlock
          );
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
