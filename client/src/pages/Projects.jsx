import { ProjectsContainer } from "../components/Project/index";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

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
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <h4>
            You need to be logged in to see this. Use the access links to sign
            up or log in!
          </h4>
        ) : null}
      </>
    );
  }

  return (
    <>
      <ProjectsContainer projects={projects}></ProjectsContainer>
    </>
  );
}

export default Projects;
