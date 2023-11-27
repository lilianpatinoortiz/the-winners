import { TasksContainer } from "../components/Task/index";
import { useTaskGuruContext } from "../utils/GlobalState";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Tasks() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // state for the app
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

  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <>
            <h5>
              You need to be logged in to see this. Use the access links to sign
              up or log in!
            </h5>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={1000} height={600} />
            </Stack>
          </>
        ) : null}
      </>
    );
  }
  return (
    <>
      <TasksContainer
        loading={loading}
        rows={state.tasks}
        rowsPerPageProp={10}
      ></TasksContainer>
    </>
  );
}

export default Tasks;
