import { useState } from "react";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ChartBar } from "../Chart/index";
import { useState, useEffect } from "react";

const createProject = () => {
  console.log("create project");
};

function ProjectsContainer({ loading, projects, tasks }) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateProject = () => {
    setShowCreateForm(true);
  };

  const [rows, setRows] = useState(projects);
  const [tasksData, setTasks] = useState(tasks);
  const [tasksByProject] = useState({});

  useEffect(() => {
    setRows(projects);
  }, [rows, projects]);

  useEffect(() => {
    setTasks(tasks);
  }, [tasksData, tasks]);

  /* The following code should be improved */
  projects.forEach((project) => {
    tasksByProject[project.title] = tasks.filter(
      (task) => task.project == project.title
    );
  });
  for (const project in tasksByProject) {
    let tasksChart = tasksByProject[project];
    tasksChart["chart"] = [
      { key: "Finished", value: 0 },
      { key: "In Progress", value: 0 },
      { key: "Open", value: 0 },
    ];
    for (const task in tasksChart) {
      if (tasksChart[task].status) {
        tasksChart.chart.find(
          (item) => item.key == tasksChart[task].status
        ).value += 1;
      }
    }
  }
  /* The code above should be improved  */

  return (
    <>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={4} md={10} lg={10}></Grid>
            <Grid item xs={8} md={2} lg={2}>
              <Button
                component="label"
                variant="contained"
                onClick={createProject}
                startIcon={<AddCircleIcon />}
              >
                Create project
              </Button>
            </Grid>
          </Grid>
          {showCreateForm && <ProjectForm />}
          {rows.length ? (
            <Grid container spacing={2} id="projects">
              {rows.map((project) => (
                <Grid item xs={12} md={6} lg={6} key={project.title}>
                  <Item key={project._id} elevation={4}>
                    <div id="project-box">
                      <h2>{project.title}</h2>
                      {tasks.length ? (
                        <>
                          <ChartBar
                            data={tasksByProject[project.title].chart}
                            colors={["#00800075", "#ffc10769", "#673ab76e"]}
                            title="Tasks"
                          ></ChartBar>
                        </>
                      ) : null}
                      <hr></hr>
                      <Button href={`/singleproject/${project._id}`}>
                        See more
                      </Button>
                    </div>
                  </Item>
                </Grid>
              ))}
            </Grid>
          ) : (
            <h3>You haven't added any projects yet!</h3>
          )}
        </>
      ) : null}
    </>
  );
}

export { ProjectsContainer };
