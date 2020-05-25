import Axios from "axios";

import { GET_ALL_FRUIT, GET_ONE_FRUIT } from "../actionTypes/fruitsActionTypes";

export const fetchAllFruit = () => {
    return (dispatch, getState) => {
        Axios.get(`https://www.fruityvice.com/api/fruit/all`)
            .then(res => dispatch({ type: GET_ALL_FRUIT, fruits: res.data }))
            .catch((err) => {
                dispatch({ type: 'FETCH_ERROR', err })
            })
    }
}

export const fetchCertainFruit = fruitName => {
    return (dispatch, getState) => {
        Axios.get(`https://www.fruityvice.com/api/fruit/${fruitName}`)
            .then(res => dispatch({ type: GET_ONE_FRUIT, fruit: res.data })
            )
            .catch((err) => {
                dispatch({ type: 'FETCH_SEARCHED_GAME_ERROR', err })
            })
    }
}
