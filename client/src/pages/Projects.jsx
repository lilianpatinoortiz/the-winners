import { ProjectsContainer } from "../components/Project/index";
/*
 Dummy data - to be removed
 */
const projects = [
  {
    title: "Project 1",
    description: "Description 1",
    data: [
      { key: "Finished", value: 1 },
      { key: "In Progress", value: 2 },
      { key: "Open", value: 3 },
    ],
  },
  {
    title: "Project 2",
    description: "Description 2",
    data: [
      { key: "Finished", value: 1 },
      { key: "In Progress", value: 1 },
      { key: "Open", value: 1 },
    ],
  },
  {
    title: "Project 3",
    description: "Description 3",
    data: [
      { key: "Finished", value: 10 },
      { key: "In Progress", value: 0 },
      { key: "Open", value: 0 },
    ],
  },
  {
    title: "Project 4",
    description: "Description 4",
    data: [
      { key: "Finished", value: 13 },
      { key: "In Progress", value: 3 },
      { key: "Open", value: 3 },
    ],
  },
  {
    title: "Project 5",
    description: "Description 5",
    data: [
      { key: "Finished", value: 14 },
      { key: "In Progress", value: 2 },
      { key: "Open", value: 8 },
    ],
  },
  {
    title: "Project 6",
    description: "Description 6",
    data: [
      { key: "Finished", value: 2 },
      { key: "In Progress", value: 4 },
      { key: "Finished", value: 1 },
    ],
  },
];
/*
 Dummy data - to be removed
 */
function Projects() {
  return (
    <>
      <ProjectsContainer projects={projects}></ProjectsContainer>
    </>
  );
}

export default Projects;
