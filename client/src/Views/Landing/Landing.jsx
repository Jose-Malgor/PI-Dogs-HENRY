import { Link } from "react-router-dom";
import style from "./Landing.module.css"
import perros from "./../../img/perros-Landing.jpg"
const Landing = () =>{
    return(
        <div className={style.main}>
            <div className={style.overlay}>
            <img src={perros}/>
            </div>
        <h1>Bienvenido!!</h1>
        
        <Link to='/home'>Home</Link>
        
        </div>
    )
}

export default Landing;