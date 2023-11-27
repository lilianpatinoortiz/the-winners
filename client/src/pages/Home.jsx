import { TasksList } from "../components/TasksList";
import { ChartBar, ChartLine } from "../components/Chart";
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
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  lineHeight: "60px",
}));

function Home() {
  const [state, dispatch] = useTaskGuruContext();
  const [open, setOpen] = useState(false);
  const { loading, data } = useQuery(QUERY_TASKS);
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};
  // chart data
  let chartData = [];

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
    }
  }, [data, dispatch]);

  const createChartData = () => {
    chartData = [
      { key: "Finished", value: 0 },
      { key: "In Progress", value: 0 },
      { key: "Open", value: 0 },
    ];
    state.tasks.map((task) => {
      chartData.find((item) => item.key == task.status).value += 1;
    });
  };

  createChartData();
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
          <>
            <h4>
              You need to be logged in to see this. Use the access links to sign
              up or log in!
            </h4>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: 1 }}>
                <Skeleton variant="rectangular" width={900} height={200} />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" width={300} height={200} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ margin: 1 }}>
                <Skeleton variant="rectangular" width={1200} height={500} />
              </Box>
            </Box>
          </>
        ) : null}
      </>
    );
  }
  console.log("User logged in: " + user?.name + " (" + user?.email + ")");

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
              <ChartLine
                data={chartData}
                colors={["#00800075", "#ffc10769", "#673ab76e"]}
              ></ChartLine>
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
