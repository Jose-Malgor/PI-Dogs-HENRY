import { Link } from "react-router-dom";
import style from "./Landing.module.css"
import perros from "./../../img/perros-Landing.jpg"


const Landing = () =>{

      return(
        <div className={style.main}>
            <div className={style.overlay}>
            <img src={perros} alt="imagen de fondo"/>
            </div>
        <h1>Welcome!!</h1>
        
        <Link to='/home' className={style.link}>Home</Link>
        
        </div>
    )
}

export default Landing;