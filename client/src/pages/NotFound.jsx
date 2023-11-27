import { useRouteError } from "react-router-dom";
import Button from "@mui/material/Button";

function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <br></br>
      <h2>Whoops! This is not what you were looking for right?</h2>
      <i>{error.statusText || error.message}</i>

      <Button variant="contained" href="/">
        Go back
      </Button>
      <img src="src/assets/img/404.svg" alt="404" />
    </div>
  );
}

export default NotFound;
