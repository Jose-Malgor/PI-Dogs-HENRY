import {Link} from 'react-router-dom';
import style from './NavBar.module.css';


const NavBar = () =>{
    return(
        <div className={style.mainContainer}>
            <Link to='/home'className={style.link}>HOME</Link>
            <Link to='/create'className={style.link}>FORM</Link>

        </div>
    )
}

export default NavBar;