import { GET_ALL_FRUIT, GET_ONE_FRUIT } from "../actionTypes/fruitsActionTypes"

const initState = {
    fruits: [],
    fruit: [],
}
const fruits = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_FRUIT: {
            return {...state, fruits: action.fruits}
        }
        case GET_ONE_FRUIT: {
            return {...state, fruit: action.fruit }
        }
        default:
            return state;
    }
}

export default fruits;