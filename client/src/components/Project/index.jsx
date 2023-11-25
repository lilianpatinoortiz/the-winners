import Grid from "@mui/material/Grid";
import Item from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ActionButtonNav } from "../ActionButton/index";

function ProjectBox({ title, data }) {
  return (
    <>
      <div id="project-box">
        <h2>{title}</h2>
      </div>
    </>
  );
}

function ProjectsContainer({ projects }) {
  return (
    <>
      <ActionButtonNav
        title="Create Project"
        action=""
        icon={<AddCircleIcon />}
      ></ActionButtonNav>
      {projects.length ? (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={8} md={4} key={project.title}>
              <Item key={project.title} elevation={4}>
                <ProjectBox
                  title={project.title}
                  data={project.data}
                ></ProjectBox>
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3>You haven't added any projects yet!</h3>
      )}
    </>
  );
}

export { ProjectsContainer };
