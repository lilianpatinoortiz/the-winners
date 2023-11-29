import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

function Kanban() {
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

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
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={9} md={9} xs={12} key={1}>
          <div>
            <h1>Coming soon! </h1>
          </div>
        </Grid>
        <Grid item lg={9} md={9} xs={12} key={2}>
          <div>
            <h3>
              Stay tuned for the Kanban feature, coming live this Christmas 🎄
            </h3>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Kanban;
