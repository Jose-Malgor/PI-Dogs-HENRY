import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";


const CardsContainer = (props)=>{
    const currentDogs = props.currentDogs; 
        
    return(
        <div className={style.container}>
            {currentDogs.map(dog=>{
                return <Card
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                id={dog.id}
                />

            })}

        </div>
    )

}

export default CardsContainer;