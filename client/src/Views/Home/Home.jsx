import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";


const Home = () =>{
    const dispatch = useDispatch();

    useEffect(()=>{              // cuando se moenta el componente Home se hace el dispatch de la action.
        dispatch(getDogs());
    },[dispatch])

    return(
        <>
        <h1>Esta es la vista de Home</h1>
        <CardsContainer/>
        </>
    )
}

export default Home;