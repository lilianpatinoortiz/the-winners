import { TasksContainer } from "../components/Task/index";
import { useTaskGuruContext } from "../utils/GlobalState";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";

function Tasks() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // state for the app
  const [state, dispatch] = useTaskGuruContext();
  // Tasks data
  const { loading, data } = useQuery(QUERY_TASKS);

  // Handle tasks changes
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
    }
  }, [data, dispatch]);

  // Get my tasks
  const filterMyTasks = () => {
    return state.tasks.filter((task) => task.userid === user._id);
  };

  // If the user is not logged in
  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <>
            <h4>
              You need to be logged in to see this. Use the access links to sign
              up or log in! 🙂
            </h4>
          </>
        ) : null}
      </>
    );
  }
  // If the user is  logged in
  return (
    <>
      <TasksContainer
        loading={loading}
        rows={filterMyTasks()}
        rowsPerPageProp={10}
      ></TasksContainer>
    </>
  );
}

export default Tasks;
