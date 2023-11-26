import Grid from "@mui/material/Grid";
import Item from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const createProject = () => {
  console.log("create project");
};

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
      <Grid container spacing={2}>
        <Grid item xs={9} md={10}></Grid>
        <Grid item xs={2} md={2}>
          <Button
            component="label"
            variant="contained"
            onClick={createProject}
            startIcon={<AddCircleIcon />}
          >
            Create project
          </Button>
        </Grid>
      </Grid>
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