import * as api from "./api.js"

export const getMenuBySearch = (searchVal) => async(dispatch) => {
    try {
        const {data : {data}} = await api.fetchMenuBySearch(searchVal);
        dispatch({ data });
    } catch (error) {
        console.log(error);
    }
}


