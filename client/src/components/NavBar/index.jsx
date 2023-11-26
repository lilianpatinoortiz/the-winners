// Bringing in the required import from 'react-router-dom'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import LoginForm from "../Login/LoginForm";
import { Modal } from "react-bootstrap";
import SignupForm from "../Signup/SignupForm";

function Nav() {
  const [show, setShow] = useState({login:false, signup:false});

  const handleClose = () => setShow({login:false, signup:false});
  const handleShowLogin = () => setShow({login:true, signup:false});
  const handleShowSignup = () => setShow({login:false, signup:true});
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <>
    <Navbar
      links={[
        <Button key={1} variant="contained" href="/">
          Home
        </Button>,
        <Button key={2} variant="contained" onClick={handleShowLogin}>
          Login
        </Button>,
        <Button key={3} variant="contained" onClick={handleShowSignup}>
          Signup
        </Button>,
        <Button key={4} variant="contained" href="/kanban">
          Kanban
        </Button>,
      ]}
    ></Navbar>
 

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
    </>
  );
}
function Navbar({ links }) {
  return (
    <Stack spacing={2} direction="row">
      {links.map((link) => link)}
    </Stack>
  );
}

export { Navbar, Nav };
