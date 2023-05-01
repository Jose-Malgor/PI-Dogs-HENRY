import style from "./Card.module.css"
import {Link} from "react-router-dom";

const Card = (props)=>{
    return(
        <div className={style.card}>
            <Link to={`/detail/${props.id}`} className={style.link}>
            
            <img className={style.cardImage} src={props.image} alt={props.image}/>
            <p>Name: {props.name}</p>
            <p>Temperaments: {props.temperaments}</p>
            <p>Weight Min: {props.weightMin}</p>
            <p>Weight Max: {props.weightMax}</p>
            
            </Link>

        </div>
    )

}

export default Card;