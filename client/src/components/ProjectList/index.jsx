import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS_QUERY } from './graphql';


const ProjectList = () =>{
    const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching projects: {error.message}</p>;

    const projects = data.projects;

    return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            {project.name} - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;