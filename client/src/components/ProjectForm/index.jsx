import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from '../../utils/mutations';

const ProjectForm = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({ name: '', description: '' });
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
                    name: project.name,
                    description: project.description,
                },
            });

            console.log('Project created', data.createProject);
            navigate("/projects");
        } catch (error) {
            console.error('Error creating project', error);
            setShowAlert(true);
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input type="text" value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} />
                <br />
                <label>Description:</label>
                <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} />
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
