import React from "react";
import Row from "./Row";
import { IBoard } from "./types";

function Board(props: IBoard) {
  const row = props.rows.map((row, index) => {
    return <Row {...row} key={index} />;
  });
  return <div className="board">{row}</div>;
}

export default Board;
