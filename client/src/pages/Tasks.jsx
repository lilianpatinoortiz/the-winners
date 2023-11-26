import { TasksContainer } from "../components/Task/index";

const tasks = [
  { title: "Task 1", description: "Description 1" },
  { title: "Task 2", description: "Description 2" },
  { title: "Task 3", description: "Description 3" },
  { title: "Task 4", description: "Description 4" },
  { title: "Task 5", description: "Description 5" },
  { title: "Task 6", description: "Description 6" },
];

function Tasks() {
  return (
    <>
      <TasksContainer tasks={tasks} rowsPerPageProp={10}></TasksContainer>
    </>
  );
}

export default Tasks;
