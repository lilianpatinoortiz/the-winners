import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginIcon from "@mui/icons-material/Login";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";
import LoginForm from "../Login/index";
import { Modal } from "react-bootstrap";
import SignupForm from "../Signup/index";
import { Link } from "@mui/material";

function Navbar() {
  const [show, setShow] = useState({ login: false, signup: false });

  const handleClose = () => setShow({ login: false, signup: false });
  const handleShowLogin = () => setShow({ login: true, signup: false });
  const handleShowSignup = () => setShow({ login: false, signup: true });

  let accessLinks = [
    <Link key={0} variant="contained" onClick={handleShowLogin} id="login">
      
      <Button >
      <ListItemAvatar>
        <Avatar>
          <LoginIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Login" />
      </Button>
    </Link>,

    <Link key={3} variant="contained" onClick={handleShowSignup} id="signup">
      <Button key={4}>
        <ListItemAvatar>
          <Avatar>
            <PersonOutlineIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Signup" />
      </Button>
    </Link>,
  ];
  let links = [
    <Button key={2} href="/">
      <ListItemAvatar>
        <Avatar>
          <HomeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Home" />
    </Button>,
    <Button key={3} href="/kanban">
      <ListItemAvatar>
        <Avatar>
          <CalendarMonthIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Kanban" />
    </Button>,
    <Button key={4} href="/projects">
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Projects" />
    </Button>,
    <Button key={5} href="/tasks">
      <ListItemAvatar>
        <Avatar>
          <TaskAltIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Tasks" />
    </Button>,
  ];
  return (
    <>
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
        <div id="modals">
          <Modal show={show.login} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LoginForm />
            </Modal.Body>
          </Modal>
          <Modal show={show.signup} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignupForm />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export { Navbar };
