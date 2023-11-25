import { useState } from "react";
import { ActionButtonNav } from "../ActionButton/index";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TasksList } from "../TasksList";

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

function TasksContainer({ tasks }) {
  return (
    <>
      <ActionButtonNav
        title="Create Task"
        action=""
        icon={<AddCircleIcon />}
      ></ActionButtonNav>
      {tasks.length ? (
        <Grid container spacing={2} id="tasks-grid">
          <TasksList></TasksList>
        </Grid>
      ) : (
        <h3>You haven't added any tasks yet!</h3>
      )}
    </>
  );
}

export { Task, TasksContainer };
