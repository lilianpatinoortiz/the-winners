import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button as MuiButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TasksList } from "../TasksList";
import { Form, Modal, Button } from "react-bootstrap";
import { ADD_TASK } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_PROJECTS } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROJECTS } from "../../utils/actions";
import { useTaskGuruContext } from "../../utils/GlobalState";

function TaskForm() {
  const navigate = useNavigate();
  const [state, dispatch] = useTaskGuruContext();

  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // Projects data
  const { loading, data: projects } = useQuery(QUERY_PROJECTS);

  // Handle projects changes
  useEffect(() => {
    if (projects) {
      dispatch({
        type: UPDATE_PROJECTS,
        projects: projects.projects,
      });
    }
  }, [projects, dispatch]);

  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    createdDate: new Date(),
    dueDate: new Date(),
    priority: 1,
    status: "Open",
    project: "",
    userid: user._id,
  });
  const [addTask, { error }] = useMutation(ADD_TASK);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskFormData({ ...taskFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (taskFormData.project === "") {
      taskFormData.project = filterMyProjects()[0].title;
    }
    try {
      const { data } = await addTask({
        variables: { ...taskFormData },
      });
      console.log("Task created", data.addTask);
      Swal.fire({
        text: "Task created",
        icon: "success",
        background: "white",
      }).then((result) => {
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }

    setTaskFormData({
      title: "",
      description: "",
      createdDate: new Date(),
      dueDate: new Date(),
      priority: 1,
      status: "Open",
      project: "",
      userid: user._id,
    });
    navigate("/"); // Redirect user to home page
  };

  // Get my projects
  const filterMyProjects = () => {
    return state.projects.filter((project) => project.userid === user._id);
  };

  return (
    <div>
      <Form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="title"
            type="text"
            name="title"
            value={taskFormData.title}
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, title: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="description"
            type="text"
            name="description"
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, description: e.target.value })
            }
            value={taskFormData.description}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            placeholder="due date"
            type="date"
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, dueDate: e.target.value })
            }
            value={taskFormData.dueDate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="priority">
          <Form.Label>Prority</Form.Label>
          <Form.Range
            placeholder="prority"
            type="number"
            min="1"
            max="3"
            name="prority"
            onChange={(e) =>
              setTaskFormData({
                ...taskFormData,
                priority: parseInt(e.target.value),
              })
            }
            value={taskFormData.priority}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="project">
          <Form.Label>Project</Form.Label>
          <Form.Select
            placeholder="project"
            type="dropdown"
            name="project"
            onChange={(e) =>
              setTaskFormData({ ...taskFormData, project: e.target.value })
            }
            value={taskFormData.projectß}
          >
            {filterMyProjects().map((project) => (
              <option value={project.title}>{project.title}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

function TasksContainer({ loading, rows, rowsPerPageProp }) {
  const [show, setShow] = useState({ task: false });

  const createTask = () => setShow({ task: false });
  const handleShowCreateTask = () => setShow({ task: true });
  const handleClose = () => setShow({ task: false });

  return (
    <>
      {!loading ? (
        <>
          <div id="modals">
            <Modal show={show.task} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TaskForm />
              </Modal.Body>
            </Modal>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={4} md={10}></Grid>
            <Grid item xs={8} md={2}>
              <MuiButton
                // component="label"
                variant="contained"
                startIcon={<AddCircleIcon />}
                onClick={handleShowCreateTask}
                id="login"
              >
                Create task
              </MuiButton>
            </Grid>
          </Grid>
          {rows.length ? (
            <Grid container spacing={2} id="tasks-grid">
              <TasksList
                tasks={rows}
                rowsPerPageProp={rowsPerPageProp}
                isBackgroundColorEnabled={true}
              ></TasksList>
            </Grid>
          ) : (
            <h3>You haven't added any tasks yet!</h3>
          )}
        </>
      ) : null}
    </>
  );
}

export { TaskForm, TasksContainer };
