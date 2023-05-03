import { GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, FILTER_BY_TEMP, GET_TEMPS, ORDER_BY_NAME, ORDER_BY_WEIGHT, ORDER_BY_SORT } from "./actions";

const initialState = {
    dogs: [],
    copiedDogs:[],
    detail: [],
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                copiedDogs:action.payload,
            };

        case GET_DOG_BY_ID:
            return { ...state, detail: action.payload };

        case GET_DOG_BY_NAME:
            return { ...state, copiedDogs: action.payload };

        case GET_TEMPS:
            return { ...state, temperaments: action.payload };


        case FILTER_BY_TEMP:
            const allDogsTemp = state.dogs;
            const temp = `${action.payload}`;
            console.log(`tempR:${temp}`)
            const filteredDogsTemp =
                allDogsTemp.filter((dog) => dog.temperaments?.includes(temp));
            return { ...state, copiedDogs: filteredDogsTemp };


        case ORDER_BY_NAME:
            const allDogsName = state.dogs;
            let orderNameFunction =
                action.payload === "Ascending"
                ? (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
                : (a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
            let orderedName = allDogsName.sort(orderNameFunction);
            return {
                ...state,
                copiedDogs: [...orderedName],
            };

        case ORDER_BY_WEIGHT:
            const allDogsWeight = state.dogs;
            let orderWeightFunction =
                action.payload === "Weightiest"
                    ? (a, b) => {
                        return parseInt(a.weightMax) > parseInt(b.weightMax) ? -1 : 1;
                    }
                    : (a, b) => {
                        return parseInt(a.weightMin) > parseInt(b.weightMin) ? 1 : -1;
                    };
            let orderedWeight = allDogsWeight.sort(orderWeightFunction);
            return {
                ...state,
                copiedDogs: [...orderedWeight],
            };

        case ORDER_BY_SORT:
            const allDogsSort = state.dogs
            let filteredDogsSort;
            action.payload === 'Db-dogs' ?
                filteredDogsSort = allDogsSort.filter(dog => dog.created === true):
          
                filteredDogsSort = allDogsSort.filter(dog => dog.created === false);
            
            return { ...state, copiedDogs: filteredDogsSort };


        default:
            return { ...state };
    }
};

export default rootReducer;