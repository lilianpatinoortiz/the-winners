import { UPDATE_TASKS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: [...action.tasks],
      };

    default:
      return state;
  }
};
