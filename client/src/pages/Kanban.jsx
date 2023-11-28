import { useEffect } from "react";
import { KanbanBoard } from "../components/Kanban/index";
import { useTaskGuruContext } from "../utils/GlobalState";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";
import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function Kanban() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  const [state, dispatch] = useTaskGuruContext();
  const { loading: loading, data: tasks } = useQuery(QUERY_TASKS);

  useEffect(() => {
    if (tasks) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: tasks.tasks,
      });
    }
  }, [tasks, dispatch]);

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
      <KanbanBoard
              loading={loading}
              rows={state.kanban}>
        </KanbanBoard>
    </>
  );
}

export default Kanban;
