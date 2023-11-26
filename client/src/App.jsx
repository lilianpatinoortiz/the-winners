import { Outlet } from "react-router-dom";
import { Nav } from "./components/NavBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// Which endpoint to sent requests to
const httpLink = createHttpLink({
  uri:"/graphql"
});

// sets the token into the header of every request. Passing user authentication if it exists
const authLink = setContext((_,{ headers })=> {
  const token = localStorage.getItem("id_token")
  return {
    headers : {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

// Create the Apollo Client allowing the app to use hooks for sending requests
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
