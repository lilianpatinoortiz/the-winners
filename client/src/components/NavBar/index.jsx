// Bringing in the required import from 'react-router-dom'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Nav() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Navbar
      links={[
        <Button key={1} variant="contained" href="/">
          Home
        </Button>,
        <Button key={2} variant="contained" href="/login">
          Login
        </Button>,
        <Button key={3} variant="contained" href="/signup">
          Signup
        </Button>,
        <Button key={4} variant="contained" href="/kanban">
          Kanban
        </Button>,
        <Button key={1} variant="contained" href="/tasks">
        Task
      </Button>,
      ]}
    ></Navbar>
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
