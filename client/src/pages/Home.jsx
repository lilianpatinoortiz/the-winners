import { TasksCompleted } from "../components/TasksCompleted";
import { TasksList } from "../components/TasksList";
import { Chart } from "../components/Chart";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  lineHeight: "60px",
}));

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("JAN", 0),
  createData("FEB", 1),
  createData("MAR", 4),
  createData("APR", 5),
  createData("MAY", 6),
  createData("JUN", 7),
  createData("JUL", 5),
  createData("AUG", 7),
  createData("SEP", 10),
  createData("OCT", 10),
  createData("NOV", 9),
  createData("DEC", 10),
];

function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} key={1}>
          <Item key={1} elevation={4}>
            <TasksCompleted></TasksCompleted>
          </Item>
        </Grid>
        <Grid item xs={9} key={1}>
          <Chart data={data}></Chart>
        </Grid>
        <Grid item xs={12} key={2}>
          <Item key={1} elevation={4}>
            <TasksList></TasksList>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
