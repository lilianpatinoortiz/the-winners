import { TasksList } from "../components/TasksList";
import { ChartBar } from "../components/Chart";
import { styled } from "@mui/material/styles";
import { useState, forwardRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTaskGuruContext } from "../utils/GlobalState";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  lineHeight: "60px",
}));

function createData(key, value) {
  return { key, value };
}

/*
 Dummy data - to be removed
 */
const chartData = [
  createData("JAN", 0),
  createData("FEB", 1),
  createData("MAR", 4),
  createData("APR", 5),
  createData("MAY", 6),
  createData("JUN", 7),
  createData("JUL", 5),
  createData("AUG", 7),
  createData("SEP", 7),
  createData("OCT", 10),
  createData("NOV", 9),
  createData("DEC", 1),
];
/*  
Dummy data - to be removed
 */

function Home() {
  const [state, dispatch] = useTaskGuruContext();
  const [open, setOpen] = useState(false);
  const { loading, data } = useQuery(QUERY_TASKS);
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
    }
  }, [data, dispatch]);

  const filterCompletedTasks = () => {
    return state.tasks.filter((task) => task.status === "Finished");
  };

  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    handleClick();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <h4>
            You need to be logged in to see this. Use the access links to sign
            up or log in!
          </h4>
        ) : null}
      </>
    );
  }

  return (
    <>
      {!loading ? (
        <>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              All data is up to date!
            </Alert>
          </Snackbar>
          <Grid container spacing={2}>
            <Grid item xs={9} key={2}>
              <ChartBar data={chartData}></ChartBar>
            </Grid>
            <Grid item xs={3} key={1}>
              <Item key={1} elevation={4}>
                <div id="task-completed">
                  <h3>Tasks Completed</h3>
                  <label>
                    {filterCompletedTasks().length}/{state.tasks.length}
                  </label>
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} key={3}>
              <Item key={1} elevation={4}>
                <TasksList
                  rowsPerPageProp={5}
                  isBackgroundColorEnabled={false}
                  tasks={state.tasks}
                ></TasksList>
              </Item>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
}

export default Home;
