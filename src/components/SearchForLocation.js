import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { setLocation } from '../redux/actions/weatherActions';
import { render } from '@testing-library/react';
import _, { debounce } from 'lodash';
import { ChangeLocation, ChangeSearch } from '../redux/actions/weatherActions';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
const Location = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const text = useSelector((state) => {
        var a = 0
        return state.weather.text
    }, shallowEqual);
    const [hideSuggestions, toggleHide] = useState(false);
    const [search, setSearch] = useState([]);
    const [suggestions, setSuggetions] = useState([])

    const fetchAutoComplete = async (search) => {
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=zZ2BZxqBWVcGL7hJb0Rj1MsvJHJzArYi&q=${search}`).catch((err) => {
            console.log("Err", err);
        })
        setSuggetions(response.data);
        console.log(suggestions)
    };

    // useEffect(() => {
    //     fetchAutoComplete(search);
    // }, [search]
    // )

    async function onCityChange(e) {
        if (hideSuggestions == true)
            toggleHide(false)
        dispatch(ChangeSearch(e.target.value))
        await fetchAutoComplete(e.target.value)
    }

    function dispatchLocationChange(location) {
        dispatch(ChangeLocation(location))
    }

    function showList() {
        if (suggestions != undefined && suggestions.length > 0) {
            return (<Grid container sx={{ flexGrow: 1 }} justifyContent="center">
                <Box style={{width:'200px'}} sx={{ bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="secondary mailbox folder">
                        {suggestions.map((city) => {
                            return (<div><ListItem button><ListItemText onClick={() => { toggleHide(true); dispatchLocationChange(city) }} primary={city.LocalizedName} /></ListItem><Divider/></div>)
                        })}
                    </List>
                </Box>
            </Grid>)
        }
    }

    var suggstionView = undefined;
    if (!hideSuggestions) {
        suggstionView = showList()
    }

    return (
        (<div>
            <Grid container>
                <Grid item xs={12}>
                    <div style={{ height: '50px' }}></div>
                    <TextField label={'location...'} type="text" variant="outlined" onChange={(evt) => {
                        onCityChange(evt)
                    }} />
                    {suggstionView}

                </Grid>

            </Grid>
        </div>)
    );
}

export default Location;