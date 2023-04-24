import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
//export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";

export const getDogs = () =>{
    return async function (dispatch){
        const apiDogs = await axios.get("http://localhost:3001/dogs/");
    
    const dogs = apiDogs.data;
    dispatch({type: GET_DOGS, payload: dogs});
};
};

export const getDog = (id) =>{
    return async function (dispatch){
        const apiDog = await axios.get(`http://localhost:3001/dogs/${id}`);
    
    const dog = apiDog.data;
    dispatch({type: GET_DOG, payload: dog});
};
};

//export const filterBySource = () =>{
    //dispatch({type: "FILTER_BY_SOURCE"});
//};