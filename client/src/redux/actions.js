import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const GET_TEMPS = "GET_TEMPS"

//export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

export const getDogs = () =>{
    return async function (dispatch){
        const apiDogs = await axios.get("http://localhost:3001/dogs/");
    
    const dogs = apiDogs.data;
    dispatch({type: GET_DOGS, payload: dogs});
};
};

export const getDogById = (id) =>{
    return async function (dispatch){
        const apiDog = await axios.get(`http://localhost:3001/dogs/${id}`);
    
    const dog = apiDog.data;
    dispatch({type: GET_DOG_BY_ID, payload: dog});
};
};

export const getDogByName = (name) =>{
    return async function (dispatch){
        const apiDog = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
    
    const dog = apiDog.data;
    dispatch({type: GET_DOG_BY_NAME, payload: dog});
};
};

export const getTemperaments = () =>{
    return async function (dispatch){
        const temps = await axios.get("http://localhost:3001/temperaments/");
    
    const allTemps = temps.data;
    dispatch({type: GET_TEMPS, payload: allTemps});
};
};



export function filterByTemperament (temp) {
    return{type: FILTER_BY_TEMP,
    payload: temp};
};




