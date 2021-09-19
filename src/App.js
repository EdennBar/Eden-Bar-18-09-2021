import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Weather from './components/Weather';
import NavBar from './components/NavBar';
import SearchForLocation from "./components/SearchForLocation";
import Favorite from "./components/Favorite";
import SaveFavorite from"./components/SaveFavorite"
import Home from"./components/Home"
function App() {
  return (
    <div className="App">
     
      <Router>
      <NavBar></NavBar>
       <Switch>
       <Route path="/" exact component={Home}></Route>        
       <Route path="/favorite" exact component={Favorite}></Route>
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
