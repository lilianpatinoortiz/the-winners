import { useEffect } from "react";
import { ProjectsContainer } from "../components/Project/index";
import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { QUERY_PROJECTS, QUERY_ME } from "../utils/queries";
import { UPDATE_PROJECTS } from "../utils/actions";
import { useTaskGuruContext } from "../utils/GlobalState";

/*
 Dummy data - to be removed
 */
const projects2 = [
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

  // state for the app
  const [state, dispatch] = useTaskGuruContext();
  const { loading, data } = useQuery(QUERY_PROJECTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PROJECTS,
        projects: data.projects,
      });
    }
  }, [data, dispatch]);

  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <>
            <h5>
              You need to be logged in to see this. Use the access links to sign
              up or log in!
            </h5>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={1000} height={600} />
            </Stack>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      <ProjectsContainer
        loading={loading}
        projects={state.projects}
      ></ProjectsContainer>
    </>
  );
}

export default Projects;
