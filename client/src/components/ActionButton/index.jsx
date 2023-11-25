import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

function ActionButton({ title, action, icon }) {
  return (
    <Button component="label" variant="contained" startIcon={icon}>
      {title}
    </Button>
  );
}

function ActionButtonNav({ title, action, icon }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={9} md={10}></Grid>
      <Grid item xs={2} md={2}>
        <ActionButton title={title} icon={icon}></ActionButton>
      </Grid>
    </Grid>
  );
}

export { ActionButtonNav };
