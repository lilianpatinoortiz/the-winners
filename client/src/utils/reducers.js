import { UPDATE_TASKS, UPDATE_PROJECTS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: [...action.tasks],
      };
    case UPDATE_PROJECTS:
      return {
        ...state,
        projects: [...action.projects],
      };

    default:
      return state;
  }
};
