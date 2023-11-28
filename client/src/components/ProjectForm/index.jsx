import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT_MUTATION } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const ProjectForm = () => {
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
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project", error);
      setShowAlert(true);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <br />
        <label>Description:</label>
        <textarea
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
        />
        <br />
        <label>Due Date:</label>
        <input
          type="date"
          value={project.dueDate}
          onChange={(e) => setProject({ ...project, dueDate: e.target.value })}
        />
        <br />
        <button type="submit">Create Project</button>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong creating the project!
        </Alert>
      </form>
    </div>
  );
};

export default ProjectForm;
