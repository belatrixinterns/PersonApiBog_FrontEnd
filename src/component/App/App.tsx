import React from 'react';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';
import '../../sass/App.scss';
import logo from '../../assets/images/logo-belatrix.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonFormPage from '../../container/PersonFormPage/PersonFormPage';
import Home from '../../container/Home/Home';
import { Grid } from 'semantic-ui-react';
import { ToastContainer } from "react-toastify";
import KinshipForm from '../KinshipForm/KinshipForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Grid>
          <Grid.Row className="App-header">
            <Grid.Column>
              <img src={logo} className="App-logo" alt="logo" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="Body">
            <Grid.Column>
              <ToastContainer/>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/person/create" exact component={PersonFormPage} />
                <Route path="/person/update/:id" exact component={PersonFormPage} />
                <Route path="/person/inspect/:id" exact component={PersonFormPage} />
                <Route path="/persons" exact component={ListPersonPage} />
                <Route path="/kinship/create" exact component={KinshipForm} />
              </Switch>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
      <div className="Footer">
      </div>
    </Router>
  );
}
export default App;
