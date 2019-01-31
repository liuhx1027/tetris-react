import React, { Component } from "react";
// import Counter from "./components/counter";
import Board from "./components/Board";
import { IBoard, IRow, ICell } from "./components/types";

const rowCount = 15;
const columnCount = 15;
const board: IBoard = {
  rows: new Array(rowCount).fill(1).map((rowItem, rowIndex) => {
    return {
      cells: new Array(columnCount).fill(1).map((columnItem, columnIndex) => {
        // isFilled = !isFilled;
        return { isFilled: rowIndex > rowCount -5 };
      })
    };
  })
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board {...board} />
      </div>
    );
  }
}

export default App;
