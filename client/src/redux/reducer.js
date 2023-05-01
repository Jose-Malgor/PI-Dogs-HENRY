import { GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, FILTER_BY_TEMP, GET_TEMPS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./actions";

const initialState = {
    dogs: [],
    detail: [],
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,

            };

        case GET_DOG_BY_ID:
            return { ...state, detail: action.payload };

        case GET_DOG_BY_NAME:
            return { ...state, dogs: action.payload };

        case GET_TEMPS:
            return { ...state, temperaments: action.payload };


        case FILTER_BY_TEMP:
            const allDogs = state.dogs
            const temp = `'${action.payload}'`;
            const filteredDogs =
                allDogs.filter((dog) => dog.temperament?.includes(temp));
            return { ...state, dogs: filteredDogs };


        case ORDER_BY_NAME:
            let orderNameFunction =
                action.payload === "Ascending"
                    ? (a, b) => {
                        return a.name > b.name ? 1 : -1;
                    }
                    : (a, b) => {
                        return a.name < b.name ? 1 : -1;
                    };
            let orderedName = state.dogs.sort(orderNameFunction);
            return {
                ...state,
                dogs: [...orderedName],
            };

        case ORDER_BY_WEIGHT:
            let orderWeightFunction =
                action.payload === "Weightiest"
                ? (a, b) => {
                    return parseInt(a.weightMax) > parseInt(b.weightMax) ? -1 : 1;
                  }
                : (a, b) => {
                    return parseInt(a.weightMin) > parseInt(b.weightMin) ? 1 : -1;
                  };
            let orderedWeight = state.dogs.sort(orderWeightFunction);
            return {
                ...state,
                dogs: [...orderedWeight],
            };

        default:
            return { ...state };
    }
};

export default rootReducer;