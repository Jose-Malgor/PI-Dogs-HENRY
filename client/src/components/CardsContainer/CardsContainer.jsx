import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";


const CardsContainer = ()=>{
    const dogs = useSelector(state=>state.dogs);  // Extraigo los dogs del estado global
    return(
        <div className={style.container}>
            {dogs.map(dog=>{
                return <Card
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                />

            })}

        </div>
    )

}

export default CardsContainer;