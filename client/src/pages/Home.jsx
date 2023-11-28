import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useTaskGuruContext } from "../utils/GlobalState";
import { QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_TASKS } from "../utils/actions";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Dashboard } from "../components/Dashboard";

function Home() {
  const [state, dispatch] = useTaskGuruContext();
  const [open, setOpen] = useState(false);
  // Tasks data
  const { loading, data } = useQuery(QUERY_TASKS);
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};
  // chart data
  let chartData = [];

  // Handle tasks changes
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
    }
  }, [data, dispatch]);

  // Create chart data function
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

  // Get the completed tasks for the metrics
  const filterCompletedTasks = () => {
    return state.tasks.filter((task) => task.status === "Finished");
  };

  // Handle click for the alert
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

  // If the user is not logged in
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

  // If the user is  logged in
  // console.log("User logged in: " + user?.name + " (" + user?.email + ")");

  return (
    <>
      <Dashboard
        loading={loading}
        title={user.name ? "Welcome " + user.name : "Welcome"}
        user={user}
        open={open}
        handleClose={handleClose}
        chartData={chartData}
        filterCompletedTasks={filterCompletedTasks}
        tasks={state.tasks}
      ></Dashboard>
    </>
  );
}

export default Home;
