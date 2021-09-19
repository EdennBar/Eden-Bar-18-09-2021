import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ChangeLocation } from '../redux/actions/weatherActions';
import { setLocation } from '../redux/actions/weatherActions';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';



const SaveFavorite = () => {
     const location = useSelector((state) => {
        return state.weather.location
     }, shallowEqual);
     

    

    function addFavorites() {
    var Name=location.LocalizedName;
    var Key =location.Key;
    var favorites= getItemFromLocalStorage()
    var newFavorite={Name,Key}
    favorites.push(newFavorite)
    localStorage.setItem('favorites',JSON.stringify(favorites))
    
    }

    function getItemFromLocalStorage(){
        const favorites=localStorage.getItem('favorites')
        if(favorites==undefined){
            return [];
        }
        return JSON.parse(favorites);
    }
   
    return (<div>
         <div style={{marginTop:'50px'}}></div>
<Button variant="contained" color="primary" onClick={addFavorites}>Save Favorite</Button>
    </div>);
}

export default SaveFavorite;




