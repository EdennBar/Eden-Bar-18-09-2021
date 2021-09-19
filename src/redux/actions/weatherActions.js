import { ActionTypes } from "../contants/action-types"

//Saves weather at the time of look up
export const ChangeWeather = (weather) => {
    return {
        type: ActionTypes.CHANGE_WEATHER,
        payload: weather,

    };
};

//Saves the next days forecast data
export const ChangeDailyForcast = (dailyForcast) => {
    return {
        type: ActionTypes.CHANGE_DAILYFORCAST,
        payload: dailyForcast,

    };
};

//Saves the current location
export const ChangeLocation = (location) => {
    return {
        type: ActionTypes.CHANGE_LOCATION,
        payload: location,

    };
};

//Saves the current text
export const ChangeSearch = (text) => {
    return {
        type: ActionTypes.CHANGE_SEARCH,
        payload: text,

    };
};




