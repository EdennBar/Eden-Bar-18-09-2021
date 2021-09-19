
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
   
    
  }));
  
const NavBar = () => {
    const classes = useStyles();
    return (  
        <div className={classes.root}>
        <AppBar position="static" style={{width:'100%'}}>
            
          <Toolbar >
          
            <Typography variant="h6" edge="start">
            <Link style={{ textDecoration: 'none', color:'white', fontSize:'1.5rem'}} to={{pathname: "/favorite"}}>Favorite</Link>
            </Typography>
           
          </Toolbar>
        </AppBar>
      </div>

    );
}
 
export default NavBar;
