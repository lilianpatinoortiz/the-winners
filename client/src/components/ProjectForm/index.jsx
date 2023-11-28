import { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT_MUTATION } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const ProjectForm = ({ show, handleCreateProject }) => {
  const navigate = useNavigate();
  // Logged user data (me)
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  const [project, setProject] = useState({
    title: "",
    description: "",
    userid: user._id,
    createdDate: new Date(),
    dueDate: new Date(),
  });
  const [showAlert, setShowAlert] = useState(false);

  const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    try {
      const { data } = await createProject({
        variables: {
          title: project.title,
          description: project.description,
          userid: project.userid,
          createdDate: project.createdDate,
          dueDate: project.dueDate,
        },
      });

      console.log("Project created", data.createProject);
      navigate("/");
    } catch (error) {
      console.error("Error creating project", error);
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleCreateProject}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as={"textarea"}
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due Date:</Form.Label>
              <Form.Control
                type="date"
                value={project.dueDate}
                onChange={(e) =>
                  setProject({ ...project, dueDate: e.target.value })
                }
              />
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
              Create Project
            </Button>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong creating the project!
            </Alert>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateProject}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectForm;
