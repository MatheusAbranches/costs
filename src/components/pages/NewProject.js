import { useNavigate } from "react-router-dom";

import styles from "./NewProject.module.css";

import ProjectForm from "../project/ProjectForm";

const NewProject = () => {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cot and services
    project.cost = 0;
    project.services = [];

    console.log(project);

    fetch("https://managecosts.herokuapp.com/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // redirect
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie Seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
};

export default NewProject;
