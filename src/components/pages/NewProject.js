import styles from "./NewProject.module.css";

import ProjectForm from "../project/ProjectForm";

const NewProject = () => {
  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie Seu projeto para depois adicionar os serviços</p>
      <ProjectForm btnText="Criar projeto"/>
    </div>
  );
};

export default NewProject;
