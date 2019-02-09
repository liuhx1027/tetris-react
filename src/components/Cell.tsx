import React from "react";

function Cell(props) {
  return (
    <div className={`cell ${props.isFilled && "cell-filled"}`}>
      {props.rowIndex}, {props.columnIndex}
    </div>
  );
}

export default Cell;
