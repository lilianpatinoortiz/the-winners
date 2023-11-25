import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Navbar } from "./components/NavBar";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Navbar />
        <main className="MuiBox-root css-fxbtpg">
          <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-i6s8oy"></div>
          <div className="MuiContainer-root MuiContainer-maxWidthLg css-1oifrf6">
            <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb">
              <Outlet />
            </div>
          </div>
        </main>
      </ApolloProvider>
    </>
  );
}

export default App;
