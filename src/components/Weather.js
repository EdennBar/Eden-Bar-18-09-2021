import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { setLocation } from '../redux/actions/weatherActions';
import { render } from '@testing-library/react';
import _, { debounce } from 'lodash';
import { ChangeLocation } from '../redux/actions/weatherActions';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveFavorite from './SaveFavorite';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    media: {
        height: 200,
        width: "100%",
    },
});
const Weather = () => {
    const classes = useStyles();
    //current temprature
    const [conditions, setConditions] = useState(undefined)
    //5 day tahazit data
    const [forecast, setForecast] = useState([])
    const dispatch = useDispatch();
    const location = useSelector((state) => {
        return state.weather.location
    }, shallowEqual);

    useEffect(() => {
        if (location != undefined) {
            getWeather(location)
        }
    }, [location])

    async function getWeather(location) {
        if (location.Key != undefined) {
            var conditionsData = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=spLzfudnyz7EG9tZ0CY9bG2Lz1v9Nam8`).catch((err) => {
                console.log("Err", err);
            })
            var forecastData = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.Key}?apikey=spLzfudnyz7EG9tZ0CY9bG2Lz1v9Nam8`)
            console.log(conditionsData)
            setConditions(conditionsData.data[0])
            console.log(forecastData)
            setForecast(forecastData.data.DailyForecasts)
        }

    }

    function filterIntToDay(num) {
        switch (num) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
        }
    }
    //

    function statusOfDay(hours) {

        let timeSrc = null;
        if (hours >= 6 && hours < 18) {
            return timeSrc = 'https://raw.githubusercontent.com/AsishRaju/Weather-App/master/img/day.svg'
        } else {
            return timeSrc = 'https://raw.githubusercontent.com/AsishRaju/Weather-App/master/img/night.svg'
        }
    }

    function icons(conditionIcon) {
        return `https://raw.githubusercontent.com/AsishRaju/Weather-App/master/img/icons/${conditionIcon}.svg`;
    }

    function celOrFar(conditionData) {
        if (conditionData == undefined) return;
        if (true) {
            return conditionData.Temperature.Metric.Value + 'C'
        }
        return conditionData.Temperature.Imperial.Value + 'F'
    }
    return (
        <div>
            <Typography style={{fontSize:'1.5rem'}}>{celOrFar(conditions)} </Typography>
            <div style={{height:'30px'}}></div>
            <Grid container sx={{ flexGrow: 1 }}spacing={2} justifyContent="center">

                {forecast.map((day) => {
                    return (<Grid item xs={12} item md={2}>
                        <Card style={{backgroundColor:'#F5F5F5'}}className={classes.root}>
                            <CardMedia className={classes.media} image={statusOfDay(new Date(Date.parse(day.Date)).getHours())} />
                            <CardContent>
                                <Typography>{location.LocalizedName} </Typography>
                                <img src={icons(conditions.WeatherIcon)} />
                                <Typography>Day {(day.Temperature.Maximum.Value-30)/2} </Typography>
                                <Typography>Night {(day.Temperature.Minimum.Value-30)/2} </Typography>
                                <Typography>{filterIntToDay(new Date(Date.parse(day.Date)).getDay())} </Typography>
                            </CardContent>
                        </Card>

                    </Grid>)
                })}
            </Grid>
        </div>
    );

}

export default Weather;