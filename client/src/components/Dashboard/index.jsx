import { TasksList } from "../TasksList";
import { ChartBar, ChartLine, ChartArea } from "../Chart";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { useState, forwardRef, useEffect } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  lineHeight: "60px",
}));

const Dashboard = ({
  title,
  loading,
  user,
  open,
  handleClose,
  chartData,
  filterCompletedTasks,
  tasks,
}) => {
  return (
    <>
      {!loading ? (
        <>
          <div id="home-title">
            <h3>{title ? title : "Welcome" + user.name}</h3>
          </div>
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
            <Grid item lg={9} md={9} xs={12} key={2}>
              <ChartArea
                data={chartData}
                colors={["#00800075", "#ffc10769", "#673ab76e"]}
                title="Tasks Status"
              ></ChartArea>
            </Grid>
            <Grid item lg={3} md={3} xs={12} key={1}>
              <Item key={1} elevation={4}>
                <div id="task-completed">
                  <h5>Tasks Completed</h5>
                  <label>
                    {filterCompletedTasks().length}/{tasks.length}
                  </label>
                </div>
              </Item>
            </Grid>
            <Grid item xs={12} key={3}>
              <Item key={1} elevation={4}>
                <TasksList
                  rowsPerPageProp={5}
                  isBackgroundColorEnabled={false}
                  tasks={tasks}
                ></TasksList>
              </Item>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export { Dashboard };
