import { ProjectsContainer } from "../components/Project/index";

const projects = [
  { title: "Project 1", description: "Description 1" },
  { title: "Project 2", description: "Description 2" },
  { title: "Project 3", description: "Description 3" },
  { title: "Project 4", description: "Description 4" },
  { title: "Project 5", description: "Description 5" },
  { title: "Project 6", description: "Description 6" },
];

function Projects() {
  return (
    <>
      <ProjectsContainer projects={projects}></ProjectsContainer>
    </>
  );
}

export default Projects;
