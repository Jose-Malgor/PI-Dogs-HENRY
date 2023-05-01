import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDogById } from "../../redux/actions"
import style from "./Detail.module.css"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Detail = () => {
    const dispatch = useDispatch();
   
    const { id } = useParams();
    
    console.log(`id:${id}`);

    useEffect(() => {
        dispatch(getDogById(id))
        }, [dispatch, id]);

        const dog = useSelector(state=>state.detail); 



    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
              <img className={style.imgDog} src={dog.image} alt={dog.name} />
            </div>
            <div className={style.textWrapper}>
              <h2 className={style.h2Decoration}>{dog.name}</h2>
              <div className={style.textItems}>
                <h3>Weight: </h3>
                <p>
                  {dog.weightMin} - {dog.weightMax} Kg
                </p>
              </div>

              <div className={style.textItems}>
                <h3>Height: </h3>
                <p>
                  {dog.heightMin} - {dog.heightMax} Cm
                </p>
              </div>

              <div className={style.textItems}>
                <h3>Life Span: </h3>
                <p>{dog.life_span}</p>
              </div>
              <h3>Temperaments: </h3>
              <p>
                {/* {Array.isArray(dog.temperaments)
                  ? dog.temperaments.map((e) => e.name).join(", ")
                  : dog.temperament} */}
                  {dog.temperaments}
              </p>
            </div>
            </div>
    )
}

export default Detail;