import React from "react";

function Cell(props) {
  return <div className={`cell ${props.isFilled && "cell-filled"}`} />;
}

export default Cell;
