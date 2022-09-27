import styles from '../pages/ProjectCard.module.css'
import {BsTrashFill} from "react-icons/bs";

const ServiceCard = ({id, name, description, cost, handleRemove}) => {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);

    }

  return (
    <div className={styles.project_card}>
        <h4>{name}</h4>
        <p>Custo total: <span>R${cost}</span> 
        </p>
        <p>{description}</p>
        <div className={styles.project_card_actions}>
            <button onClick={remove}>
            <BsTrashFill />
            Excluir 
            </button>
        </div>

    </div>
  )
}

export default ServiceCard