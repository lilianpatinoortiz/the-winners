import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Kanban() {
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
      <h1>Kanban</h1>
    </>
  );
}

export default Kanban;
