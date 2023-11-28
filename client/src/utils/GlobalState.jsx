import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

const TaskGuruContext = createContext();
const { Provider } = TaskGuruContext;

const TaskGuruProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: "",
    tasks: [],
    projects: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useTaskGuruContext = () => {
  return useContext(TaskGuruContext);
};

export { TaskGuruProvider, useTaskGuruContext };
