import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Navbar } from "./components/NavBar";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
