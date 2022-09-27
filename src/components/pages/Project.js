import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../Service/ServiceForm";
import ServiceCard from "../Service/ServiceCard";
import Message from "../layout/Message";

const Project = () => {
  const { id } = useParams();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://managecosts.herokuapp.com/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
          setServices(data?.services || []);
        })
        .catch();
    }, 500);
  }, [id]);

  function editPost(project) {
    setMessage("");
    // budget validation

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`https://managecosts.herokuapp.com/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then(() => {
        window.location = "/projects";
        setMessage("projeto atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function creatService(service) {
    fetch(`https://managecosts.herokuapp.com/projects/${project.id}/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((resp) => {
        fetch(`https://managecosts.herokuapp.com/projects/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProject(data);
            setServices(data?.services || []);
          })
          .catch();
      })
      .catch();
  }

  function removeService(id) {
    fetch(
      `https://managecosts.herokuapp.com/projects/${project.id}/service/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => {
        fetch(`https://managecosts.herokuapp.com/projects/${project.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProject(data);
            setServices(data?.services || []);
          })
          .catch();
      })
      .catch();
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button onClick={toggleProjectForm} className={styles.btn}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}{" "}
                  </p>
                  <p>
                    <span>Total de Orçamento: R${project.budget}</span>
                  </p>
                  <p>
                    <span>Total Utilizado: R${project.cost}</span>
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={creatService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services?.length > 0 &&
                services?.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
