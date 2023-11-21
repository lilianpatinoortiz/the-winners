import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT_MUTATION } from './graphql';

const ProjectForm = () => {
    const [prject, setProjects] = useState({ name: '', description: '', });
    const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

    const handelSubmit = async (e) => {
            e.preventDefault();
try {

const {data} = await createProject({
    variables: {
        name: project.name,
        description: project.description,
        },
});

console.log('Porject created', data.createProject);
} catch (error) {
    console.error('error creating project', error);
}
    };
    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handelSubmit}>
                <label>Name:</label>
                <input type="text" value={project.name} onChange={e => setProject({ ...project, description: e.target.value })} />
                <br />
                <label>Description:</label>
                <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} />
                <br />
                <button type="submit">Create Project</button>
            </form>
        </div >
    );

};
export default ProjectForm;