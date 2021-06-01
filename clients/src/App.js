import './App.css';
import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


import PlayerPage from './pages/Player';
import TeamPage from './pages/Team';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        <Switch>
              <Route exact path="/team" component={TeamPage} />
              <Route exact path="/player" component={PlayerPage} />
              <Redirect to="/team"/>
        </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
