import { GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, FILTER_BY_TEMP, GET_TEMPS } from "./actions";

const initialState ={
    dogs: [],
    detail: [],
    filteredDogs: [],
    temperaments : []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {...state, dogs:action.payload};

        case GET_DOG_BY_ID:
            return {...state, detail:action.payload};

        case GET_DOG_BY_NAME:
             return {...state, dogs:action.payload};

        case GET_TEMPS:
             return {...state, temperaments:action.payload};

   
        case FILTER_BY_TEMP:
            const allDogs = state.dogs
            const filteredDogs =
            allDogs.filter((dog) => dog.temperament?.includes(action.payload));
             return {...state, dogs: filteredDogs};


        default:
            return {...state};
    }
};

export default rootReducer;