import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar"
import { Paginado } from "../../components/Paginado/Paginado";
import { useSelector } from "react-redux";
import { filterByTemperament } from "../../redux/actions";


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
           await Promise.all([
            dispatch(getDogs()),
            dispatch(getTemperaments())
          ]);
          // aquí puedes hacer algo con los datos que se han cargado
        }
        fetchData();
      }, [dispatch]);

    //useEffect(() => {              // cuando se monta el componente Home se hace el dispatch de la action.
   //     dispatch(getDogs(), getTemperaments());
   // }, [dispatch])


    //PAGINADO
    const allDogs = useSelector((state) => state.dogs)  // Extraigo los dogs del estado global
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;


    function prevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        let lastPage = Math.ceil(allDogs.length / cardsPerPage);
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const numberOfLastDog = currentPage * cardsPerPage;
    const numberOfFirstDog = numberOfLastDog - cardsPerPage;
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog);



    // TEMPERAMENT FILTER
    const temperaments = useSelector((state) => state.temperaments);
    const handleClick = (event) => {
        dispatch(filterByTemperament(event.target.value));
    };

    console.log(`temp:${temperaments}`);







    return (
        <>
            <h1>Esta es la vista de Home</h1>
            <SearchBar />
            <CardsContainer
                currentDogs={currentDogs}
            />
            <div>
                <span> Filter by temperament </span>
                <select 
                onChange={(event) => dispatch(filterByTemperament(event.target.value))}>
                    {temperaments.map((temp, index) => (
                        <option value={temp} key={index}>
                            {temp.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <Paginado
                    cardsPerPage={cardsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                />
            </div>


        </>

    );

}

export default Home;