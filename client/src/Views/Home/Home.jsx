import style from './Home.module.css';
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getTemperaments, orderByName, orderByWeight, orderBySort } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar"
import { Paginado } from "../../components/Paginado/Paginado";
import { filterByTemperament } from "../../redux/actions";
import { connect } from "react-redux";
import { useRef } from "react";


export function Home({ copiedDogs, temperaments }) {




    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments())
    }, [dispatch]);

    //PAGINADO
    //const allDogs = useSelector((state) => state.dogs)  // Extraigo los dogs del estado global


    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 8;

    //console.log("dogs:", copiedDogs[1]);


    function prevPage() {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        let lastPage = Math.ceil(copiedDogs.length / cardsPerPage);
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const numberOfLastDog = currentPage * cardsPerPage;
    const numberOfFirstDog = numberOfLastDog - cardsPerPage;
    //console.log('copiedDogs:',copiedDogs)
    const dogsShown = copiedDogs.slice(numberOfFirstDog, numberOfLastDog);
    var currentDogs = dogsShown;



    // TEMPERAMENT FILTER
    //const temperaments = useSelector((state) => state.temperaments);
    //const [selectedTemperament, setSelectedTemperament] = useState("");

    // const handleSelectTemperament = (event) => {
    //  dispatch(filterByTemperament(event.target.value));
    // setSelectedTemperament(event.target.value);
    // setCurrentPage(1);
    // };

    //const handleClick = (event) => {
    // dispatch(getDogs());
    //setFilterName("az");
    //setFilterWeight("normal");
    //setFilterBreed("all");
    //  setSelectedTemperament("");
    // setCurrentPage(1);
    //};





    // const [selectedTemperament, setSelectedTemperament] = useState("");
    // const handleClick = (event) => {
    //     setSelectedTemperament(event.target.value);
    // };
    // const filteredDogs = selectedTemperament ? currentDogs.filter(dog => dog => dog.temperament && dog.temperament.includes(selectedTemperament)) : currentDogs;



    const handleTemp = (event) => {
        dispatch(filterByTemperament(event.target.value));
        // console.log(`event:${event.target.value}`);
    };


    const handleSort = (event) => {
        // console.log('in handleSort, event:', event.target.value)
        dispatch(orderBySort(event.target.value));
    };



    const filterTemp = useRef(null);
    const filterDB = useRef(null);
    const orderName = useRef(null);
    const orderWeight = useRef(null);

    function handleReset(e) {
        // dispatch({ type: "RESET" });
        dispatch(getDogs());
        filterTemp.current.value = "";
        filterDB.current.value = "";
        orderName.current.value = "";
        orderWeight.current.value = "";
    }

    return (
        <>
            <h1>Find your favorite dog!!</h1>
            <SearchBar />
            <div className={style.container}>
                <div>
                    <span> Filter by temperament </span>
                    <select className={style.selector} ref={filterTemp}
                        onChange={handleTemp}>
                        {temperaments.map((temp, index) => (
                            <option value={temp.name} key={index}>
                                {temp.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span> Filter by DB/API </span>
                    <select className={style.selector} ref={filterDB}
                        onChange={handleSort}>
                        {['Db-dogs', 'API-Dogs'].map((e, index) => (
                            <option value={e} key={index}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span> Order by Name </span>
                    <select className={style.selector} ref={orderName}
                        onChange={(e) => dispatch(orderByName(e.target.value))}
                    >
                        {["Ascending", "Descending"].map((e, i) => (
                            <option value={e} key={i}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                <span> Order by Weight </span>
                <select className={style.selector} ref={orderWeight}
                    onChange={(e) => dispatch(orderByWeight(e.target.value))}
                >
                    {["Weightiest", "Lightest"].map((e, i) => (
                        <option value={e} key={i}>
                            {e}
                        </option>
                    ))}
                </select>
                </div>
                <div>
                    <button value="reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </div>
            <CardsContainer
                currentDogs={currentDogs}
            />
            <div>
                <Paginado
                    cardsPerPage={cardsPerPage}
                    allDogs={copiedDogs.length}
                    paginado={paginado}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                />
            </div>


        </>

    );

}

export function mapSateToProps(state) {
    return {
        copiedDogs: state.copiedDogs,
        temperaments: state.temperaments
    }
}
export default connect(mapSateToProps, null)(Home);