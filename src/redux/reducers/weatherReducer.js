import { ActionTypes } from "../contants/action-types";

const initialState = {
    location: {Key:'215854', LocalizedName:'Tel Aviv'},
    locationWeather:[]


};
export const weatherReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.CHANGE_WEATHER:
            return {...state, locationWeather: payload };

        case ActionTypes.CHANGE_LOCATION:
            return {...state, location: payload}
        case ActionTypes.CHANGE_SEARCH:
            return {...state, text: payload}
        default:
            return state;
    }
}