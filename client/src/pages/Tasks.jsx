import { TasksContainer } from "../components/Task/index";
import { useTaskGuruContext } from "../utils/GlobalState";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_TASKS } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";

function Tasks() {
  const [state, dispatch] = useTaskGuruContext();
  const { loading, data } = useQuery(QUERY_TASKS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
    }
  }, [data, dispatch]);

  return (
    <>
      <TasksContainer rows={state.tasks} rowsPerPageProp={10}></TasksContainer>
    </>
  );
}

export default Tasks;
