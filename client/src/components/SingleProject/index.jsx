import { useTaskGuruContext } from "../../utils/GlobalState";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UPDATE_TASKS } from "../../utils/actions";
import { QUERY_TASKS, QUERY_PROJECT, QUERY_ME } from "../../utils/queries";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Dashboard } from "../Dashboard";
import Grid from "@mui/material/Grid";

const SingleProject = () => {
  const { id } = useParams();

  const [state, dispatch] = useTaskGuruContext();
  const [open, setOpen] = useState(false);

  // Current project data
  const { loadingProject, data: currentProject } = useQuery(QUERY_PROJECT, {
    variables: { id: id },
  });
  const [project, setProject] = useState([]);

  // Tasks data
  const { loading, data: tasks } = useQuery(QUERY_TASKS);
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};
  // chart data
  let chartData = [];

  // Handle project changes
  useEffect(() => {
    if (currentProject) {
      setProject(currentProject.project);
    }
  }, [project, currentProject]);

  // Handle tasks changes
  useEffect(() => {
    if (tasks) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: tasks.tasks,
      });
    }
  }, [tasks, dispatch]);

  // Get my tasks
  const filterMyTasks = () => {
    return state.tasks.filter((task) => task.userid === user._id);
  };

  // Get the filtered tasks for the project
  const filteredTasks = () => {
    return filterMyTasks().filter((task) => task.project == project.title);
  };
  // Get the completed tasks for the metrics
  const filterCompletedTasks = () => {
    return filteredTasks().filter((task) => task.status === "Finished");
  };
  // Create chart data function
  const createChartData = () => {
    chartData = [
      { key: "Finished", value: 0 },
      { key: "In Progress", value: 0 },
      { key: "Open", value: 0 },
    ];
    filteredTasks().map((task) => {
      chartData.find((item) => item.key == task.status).value += 1;
    });
  };

  createChartData();

  return (
    <div>
      <Button variant="contained" href="/projects">
        Go back
      </Button>
      <hr></hr>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12} lg={12}>
          <Dashboard
            loading={loading}
            title={project?.title}
            user={user}
            open={open}
            chartData={chartData}
            filterCompletedTasks={filterCompletedTasks}
            tasks={filteredTasks()}
          ></Dashboard>
        </Grid>
      </Grid>
    </div>
  );
};
export { SingleProject };
