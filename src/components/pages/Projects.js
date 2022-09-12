import { useLocation } from "react-router-dom";
import Message from "../layout/Message";

// import styles from "./Projects.module.css"

import Container from "../layout/Container";

const Projects = () => {

  const location = useLocation();

  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  return (
    <div>
      <div>
      <h1>Meus Projetos</h1>
      <a href="#">novo projeto</a>
      </div>
      { <Message type="error" msg={message} />}

      <Container />
      
        
    </div>
  );
};

export default Projects;