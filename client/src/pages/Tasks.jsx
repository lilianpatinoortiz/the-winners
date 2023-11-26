import { TasksContainer } from "../components/Task/index";
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

function Tasks() {
  return (
    <>
      <TasksContainer rows={rows} rowsPerPageProp={10}></TasksContainer>
    </>
  );
}

export default Tasks;
