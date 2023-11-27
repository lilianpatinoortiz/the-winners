import { TasksList } from "../components/TasksList";
import { ChartBar } from "../components/Chart";
import { styled } from "@mui/material/styles";
import { useState, forwardRef, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
function createTask(
  id,
  title,
  dueDate,
  priority,
  status,
  description,
  project,
  createdDate
) {
  return {
    id,
    title,
    dueDate,
    priority,
    status,
    description,
    project,
    createdDate,
  };
}
/*
 Dummy data - to be removed
 */
const data = [
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
const totalTasks = 10;
const completedTasks = 1;
const rows = [
  createTask(
    1,
    "Task 1",
    "10/10/2023",
    3,
    "Open",
    "My task description",
    "Project 1",
    "10/10/2023"
  ),
  createTask(
    2,
    "Task 2",
    "10/10/2023",
    2,
    "In Progress",
    "My task description",
    "Project 1",
    "10/10/2023"
  ),
  createTask(
    3,
    "Task 3",
    "10/10/2023",
    1,
    "Open",
    "My task description",
    "Project 1",
    "10/10/2023"
  ),
  createTask(
    4,
    "Task 4",
    "10/10/2023",
    2,
    "Open",
    "My task description",
    "Project 1",
    "1/10/2023"
  ),
  createTask(
    5,
    "Task 5",
    "10/10/2023",
    3,
    "Open",
    "My task description",
    "Project 1",
    "10/10/2023"
  ),
  createTask(
    6,
    "Task 6",
    "10/10/2023",
    3,
    "Finished",
    "My task description",
    "Project 1",
    "10/10/2023"
  ),
  createTask(
    7,
    "Task 7",
    "10/10/2023",
    1,
    "In Progress",
    "My task description",
    "Project 1",
    "1/1/2023"
  ),
  createTask(
    8,
    "Task 8",
    "10/10/2023",
    2,
    "Open",
    "My task description",
    "Project 1",
    "1/1/2023"
  ),
];

/*  
Dummy data - to be removed
 */

function Home() {
  const [open, setOpen] = useState(false);

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
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          All data is up to date!
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={9} key={2}>
          <ChartBar data={data}></ChartBar>
        </Grid>
        <Grid item xs={3} key={1}>
          <Item key={1} elevation={4}>
            <div id="task-completed">
              <h2>Tasks Completed</h2>
              <label>
                {completedTasks}/{totalTasks}
              </label>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} key={3}>
          <Item key={1} elevation={4}>
            <TasksList
              rowsPerPageProp={5}
              isBackgroundColorEnabled={false}
              rows={rows}
            ></TasksList>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
