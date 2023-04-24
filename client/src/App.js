import './App.css';
import {Home, Detail, Form, Landing} from './Views';
import { Route } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import {useLocation} from 'react-router-dom';


function App() {

  const location = useLocation();
// console.log(location);
  return (
    <div className="App">
      {location.pathname!=="/"&&<NavBar/>}  
          
      <Route exact path="/">
      <Landing/>
      </Route>

      <Route path="/home">
      <Home/>
      </Route>

      <Route path="/detail">
      <Detail/>
      </Route>

      <Route path="/create">
      <Form/>
      </Route>



      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
