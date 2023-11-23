// Bringing in the required import from 'react-router-dom'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function Navbar() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Nav
      links={[
        <Button
          key={1}
          variant="text"
          href="/"
          startIcon={<HomeIcon />}
          size="large"
        >
          Home
        </Button>,
        <Button
          key={2}
          variant="text"
          href="/myguru"
          startIcon={<AccessTimeFilledIcon />}
          size="large"
        >
          My Guru
        </Button>,
        <Button
          key={3}
          variant="text"
          href="/kanban"
          startIcon={<CalendarMonthIcon />}
          size="large"
        >
          Kanban
        </Button>,
        <Button
          key={4}
          variant="text"
          href="/tasks"
          startIcon={<TaskAltIcon />}
          size="large"
        >
          Tasks
        </Button>,
      ]}
      accessLinks={[
        <Button key={5} variant="text" href="/login">
          Login
        </Button>,
        <Button key={6} variant="text" href="/signup">
          Signup
        </Button>,
      ]}
    ></Nav>
  );
}

function Nav({ links, accessLinks }) {
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
          <h4 className="padding20"> Menu </h4>
          <Stack spacing={2} direction="column">
            {links.map((link) => link)}
          </Stack>
        </div>
        <hr className="MuiDivider-root MuiDivider-fullWidth css-39bbo6"></hr>
        <div className="MuiList-root MuiList-padding css-1ontqvh">
          <h4 className="padding20"> Access </h4>
          <Stack spacing={2} direction="column">
            {accessLinks.map((link) => link)}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export { Navbar, Nav };
