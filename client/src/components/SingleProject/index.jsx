import { useTaskGuruContext } from "../../utils/GlobalState";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UPDATE_TASKS } from "../../utils/actions";
import { QUERY_TASKS, QUERY_PROJECT, QUERY_ME } from "../../utils/queries";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Dashboard } from "../Dashboard";

const SingleProject = () => {
  const { id } = useParams();

  const [state, dispatch] = useTaskGuruContext();
  const [open, setOpen] = useState(false);
  // Current project data
  const { loadingProject, data: currentProject } = useQuery(QUERY_PROJECT);
  console.log(currentProject);

  // Tasks data
  const { loading, data: tasks } = useQuery(QUERY_TASKS);
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};
  // chart data
  let chartData = [];

  // Handle tasks changes
  useEffect(() => {
    if (tasks) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: tasks.tasks, // TODO: Filter by currentProject.title
      });
    }
  }, [tasks, dispatch]);

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
  return (
    <div>
      <Button variant="contained" href="/projects">
        Go back
      </Button>
      <hr></hr>
      <Dashboard
        loading={loading}
        title={id}
        user={user}
        open={open}
        chartData={chartData}
        filterCompletedTasks={filterCompletedTasks}
        tasks={state.tasks}
      ></Dashboard>
    </div>
  );
};
export { SingleProject };
