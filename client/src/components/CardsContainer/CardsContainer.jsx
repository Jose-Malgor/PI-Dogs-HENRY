import Card from "../Card/Card";
import style from "./CardsContainer.module.css"



const CardsContainer = (props)=>{
    const currentDogs = props.currentDogs; 
           // console.log('currentDogs:',currentDogs)
    return(
        <div className={style.container}>
            {currentDogs.map(dog=>{
                if (dog.image.slice(0,4) !== 'http') dog.image = 'https://static.vecteezy.com/system/resources/thumbnails/009/551/676/small/shy-dog-logo-illustration-depicting-shy-dog-suitable-for-pet-company-free-vector.jpg'
                 return <Card
                image={dog.image}
                name={dog.name}
                temperaments={dog.temperaments || dog.Temperaments}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                id={dog.id}
                key={dog.id}
                />

            })}

        </div>
    )

}

export default CardsContainer;