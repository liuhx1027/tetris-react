import { ActionType } from "./types";

const counter = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      console.log("increment..." + state);
      return { ...state, counter: state.counter + 1 };
    case ActionType.DECREMENT:
      console.log("decrement..." + state);
      return { ...state, counter: state.counter - 1 };
    case ActionType.RESET:
    return { ...state, counter: 0 };
    default:
      return state;
  }
};

export default counter;
