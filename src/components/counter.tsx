import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import {
  incrementAction,
  decrementAction,
  resetAction
} from "../store/actions";

export default function counter() {
  const mapState = useCallback(state => state.counter, []);
  const counter = useMappedState(mapState);

  const dispatch = useDispatch();
  const increment = useCallback(() => dispatch(incrementAction()), []);
  const decrement = useCallback(() => dispatch(decrementAction()), []);
  const reset = useCallback(() => dispatch(resetAction()), []);

  return internalCounter(counter, increment, decrement, reset);
}

function internalCounter(counter, increment, decrement, reset) {
  return (
    <div>
      <div className="row">
        <div className="col-2">{counter}</div>
        <button className="col-2 mr-3" id="incrementButton" onClick={increment}>
          +
        </button>
        <button className="col-2 mr-3" id="decrementButton" onClick={decrement}>
          -
        </button>
        <button className="col-2 mr-3" id="resetButton" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
}
