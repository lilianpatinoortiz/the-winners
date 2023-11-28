import React from "react";
import { Navbar } from "../NavBar/index";
import { TasksContainer } from "../Task/index";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid, Paper, Typography } from "@mui/material";

function KanbanBoard() {
  const [tasks, setTasks] = React.useState([]);
  const [loadingTasks, setLoadingTasks] = React.useState(true);

  // Fetch projects and tasks data (you need to implement these functions)

  const fetchTasks = async () => {
    try {
        const response = await fetch(tasksApiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data; // Assuming data is an array of tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
      }
    };

  React.useEffect(() => {
    // Fetch projects data when the component mounts
    fetchProjects()
      .then((data) => {
        setProjects(data); // Assuming data is an array of projects
        setLoadingProjects(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoadingProjects(false);
      });

    // Fetch tasks data when the component mounts
    fetchTasks()
      .then((data) => {
        setTasks(data); // Assuming data is an array of tasks
        setLoadingTasks(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoadingTasks(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleTaskDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);
  
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleTaskDragEnd}>
      <div>
        <Navbar />
        <div className="kanban-content">
          <Grid container spacing={3}>
            <Droppable droppableId="todo" direction="horizontal">
              {(provided) => (
                <Grid item xs={4} ref={provided.innerRef} {...provided.droppableProps}>
                  <Paper elevation={3} className="column">
                    <Typography variant="h6">To Do</Typography>
                    <Droppable droppableId="todoTasks" direction="vertical">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <TasksContainer
                            loading={loadingTasks}
                            rows={tasks.filter((task) => task.status === "todo")}
                            rowsPerPageProp={10}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              )}
            </Droppable>
            <Droppable droppableId="inProgress" direction="horizontal">
              {(provided) => (
                <Grid item xs={4} ref={provided.innerRef} {...provided.droppableProps}>
                  <Paper elevation={3} className="column">
                    <Typography variant="h6">In Progress</Typography>
                    <Droppable droppableId="inProgressTasks" direction="vertical">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <TasksContainer
                            loading={loadingTasks}
                            rows={tasks.filter((task) => task.status === "inProgress")}
                            rowsPerPageProp={10}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              )}
            </Droppable>
            <Droppable droppableId="completed" direction="horizontal">
              {(provided) => (
                <Grid item xs={4} ref={provided.innerRef} {...provided.droppableProps}>
                  <Paper elevation={3} className="column">
                    <Typography variant="h6">Completed</Typography>
                    <Droppable droppableId="completedTasks" direction="vertical">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <TasksContainer
                            loading={loadingTasks}
                            rows={tasks.filter((task) => task.status === "completed")}
                            rowsPerPageProp={10}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Paper>
                </Grid>
              )}
            </Droppable>
          </Grid>
        </div>
      </div>
    </DragDropContext>
  );
}

export { KanbanBoard };