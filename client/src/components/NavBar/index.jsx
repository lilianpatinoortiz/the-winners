// Bringing in the required import from 'react-router-dom'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Navbar() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Nav
      links={[
        <Button key={1} variant="outlined" href="/">
          Home
        </Button>,
        <Button key={2} variant="outlined" href="/myguru">
          My Guru
        </Button>,
        <Button key={3} variant="outlined" href="/kanban">
          Kanban
        </Button>,
        <Button key={4} variant="outlined" href="/login">
          Login
        </Button>,
        <Button key={5} variant="outlined" href="/signup">
          Signup
        </Button>,
        <Button key={4} variant="contained" href="/kanban">
          Kanban
        </Button>,
        <Button key={1} variant="contained" href="/tasks">
        Task
      </Button>,
      ]}
    ></Nav>
  );
}
function Nav({ links }) {
  return (
    <div className="MuiDrawer-root MuiDrawer-docked css-1fqw99a">
      <div className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiDrawer-paper MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft css-1l8j5k8">
        <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-e7x0wp">
          <button
            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk"
            tabIndex="0"
            type="button"
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ChevronLeftIcon"
            >
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
            <span className="MuiTouchRipple-root css-w0pj6f"></span>
          </button>
        </div>
        <hr className="MuiDivider-root MuiDivider-fullWidth css-39bbo6"></hr>
        <div className="MuiList-root MuiList-padding css-1ontqvh">
          <Stack spacing={2} direction="column">
            {links.map((link) => link)}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export { Navbar, Nav };
