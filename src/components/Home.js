import Weather from './Weather';
import SearchForLocation from "./SearchForLocation";
import SaveFavorite from "./SaveFavorite";
import Grid from '@mui/material/Grid';

const Home = () => {
    return (
        <Grid container direction="column" justifyContent="center">
            <Grid item ><SearchForLocation></SearchForLocation></Grid>
            <div style={{ height: '50px' }}></div>
            <Grid item><Weather></Weather></Grid>
            <Grid item><SaveFavorite></SaveFavorite></Grid>
        </Grid>
    );
}

export default Home;
