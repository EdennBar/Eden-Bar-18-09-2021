import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ChangeLocation } from '../redux/actions/weatherActions';
import { setLocation } from '../redux/actions/weatherActions';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
const Favorite = () => {
    const dispatch = useDispatch()
    useEffect(()=>
    {
        readFavoritesFromLocalStorage()
    },[])
const [favorites,setFavorites]=useState([])
    async function readFavoritesFromLocalStorage() {
        var favorites = getItemFromLocalStorage()

        for (var favorite of favorites) {
            var conditionsData = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${favorite.Key}?apikey=HPGICMMt60CIZ0GGkA4b5qDXGNqfOd5Y`).catch((err) => {
                console.log("Err", err);
            })
            favorite.tmp=celOrFar(conditionsData.data[0])
        }
        setFavorites(favorites);        
    }

    function celOrFar(conditionData){
        if(true){
            return conditionData.Temperature.Metric.Value
        }
        return conditionData.data[0].Temperature.Imperial.Value+'F'
    }

    function getItemFromLocalStorage() {
        const favorites = localStorage.getItem('favorites')
        if (favorites == undefined) {
            return [];
        }
        return JSON.parse(favorites);
    }
  
    function dispatchLocationChange(location) {
        dispatch(ChangeLocation(location))
    }

    return (
      
        <Grid container>
        {favorites.map((favorite) => {
            return (<Grid item xs={12} item sm={3} item md={2} item lg={2}>

                <Card style={{height:'440px'}}>
                    <CardContent>
                        <Typography>{favorite.Name} </Typography>
                        <Typography>{favorite.tmp}</Typography>
                      <Link onClick={()=>{dispatchLocationChange({Key:favorite.Key,LocalizedName:favorite.Name})}} to={{pathname: "/"}}>Move to Weather Page</Link>
                    </CardContent>
                </Card>
                
            </Grid>)
        })}
      
    </Grid>
    );
}

export default Favorite;