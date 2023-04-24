import style from "./Card.module.css"
import {Link} from "react-router-dom";

const Card = (props)=>{
    return(
        <div className={style.card}>
            <Link to={`/detail/${props.id}`} className={style.link}></Link>
            <p>Imagen: {props.image}</p>
            <p>Nombre: {props.name}</p>
            <p>Temperamentos: {props.temperaments}</p>
            <p>Peso Min: {props.weightMin}</p>
            <p>Peso Max: {props.weightMax}</p>
        </div>
    )

}

export default Card;