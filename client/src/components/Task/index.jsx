import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TasksList } from "../TasksList";
import { rootShouldForwardProp } from "@mui/material/styles/styled";

const createTask = () => {
  console.log("create task");
};

function Task() {
  const [task, setTask] = useState("");
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  return (
    <div>
      <form>
        <label>Creat a New Task</label>
        <input
          placeholder=" Enter"
          type="text"
          name="task"
          onChange={handleChange}
          value={task}
        />
      </form>
    </div>
  );
}

function TasksContainer({ loading, rows, rowsPerPageProp }) {
  return (
    <>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={4} md={10}></Grid>
            <Grid item xs={8} md={2}>
              <Button
                component="label"
                variant="contained"
                onClick={createTask}
                startIcon={<AddCircleIcon />}
              >
                Create task
              </Button>
            </Grid>
          </Grid>
          {rows.length ? (
            <Grid container spacing={2} id="tasks-grid">
              <TasksList
                tasks={rows}
                rowsPerPageProp={rowsPerPageProp}
                isBackgroundColorEnabled={true}
              ></TasksList>
            </Grid>
          ) : (
            <h3>You haven't added any tasks yet!</h3>
          )}
        </>
      ) : null}
    </>
  );
}

export { Task, TasksContainer };
