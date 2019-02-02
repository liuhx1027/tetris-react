import React from "react";
import Cell from "./Cell";
import { IRow } from "./types";

function Row(props: IRow) {
  const row = props.cells.map((cell, index) => {
    return <Cell {...cell} key={index} />;
  });
  return <div className="row">{row}</div>;
}

export default Row;
