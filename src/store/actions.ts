import { ActionType } from "./types";

export const incrementAction = () => {
  return {
    type: ActionType.INCREMENT
  };
};

export const decrementAction = () => {
  return {
    type: ActionType.DECREMENT
  };
};

export const resetAction = () => {
  return {
    type: ActionType.RESET
  };
};
