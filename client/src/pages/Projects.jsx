import { useEffect } from "react";
import { ProjectsContainer } from "../components/Project/index";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS, QUERY_TASKS, QUERY_ME } from "../utils/queries";
import { UPDATE_PROJECTS, UPDATE_TASKS } from "../utils/actions";
import { useTaskGuruContext } from "../utils/GlobalState";

function Projects() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // state for the app
  const [state, dispatch] = useTaskGuruContext();
  // Projects data
  const { loading, data: projects } = useQuery(QUERY_PROJECTS);
  // Tasks data
  const { loading: loadingTasks, data: tasks } = useQuery(QUERY_TASKS);

  // Handle projects changes
  useEffect(() => {
    if (projects) {
      dispatch({
        type: UPDATE_PROJECTS,
        projects: projects.projects,
      });
    }
  }, [projects, dispatch]);

  // Handle tasks changes
  useEffect(() => {
    if (tasks) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: tasks.tasks,
      });
    }
  }, [tasks, dispatch]);

  // Get my projects
  const filterMyProjects = () => {
    return state.projects.filter((project) => project.userid === user._id);
  };
  // Get my tasks
  const filterMyTasks = () => {
    return state.tasks.filter((task) => task.userid === user._id);
  };

  // If the user is not logged in
  if (!user.name) {
    return (
      <>
        {!userLoading ? (
          <>
            <h4>
              You need to be logged in to see this. Use the access links to sign
              up or log in! 🙂
            </h4>
          </>
        ) : null}
      </>
    );
  }
  // If the user is  logged in
  return (
    <>
      <ProjectsContainer
        loading={loading}
        projects={filterMyProjects()}
        tasks={filterMyTasks()}
      ></ProjectsContainer>
    </>
  );
}

export default Projects;
