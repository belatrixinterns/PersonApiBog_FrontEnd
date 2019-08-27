import React from 'react';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';
import '../../sass/App.scss';
import logo from '../../assets/images/logo-belatrix.png';
import { BrowserRouter, Route } from 'react-router-dom';
import PersonFormPage from '../../container/PersonFormPage/PersonFormPage';
import Home from '../../container/Home/Home';
import { Grid } from 'semantic-ui-react';
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
              <Route path="/home" exact component={Home} />
              <Route path="/person/create" exact component={PersonFormPage} />
              <Route path="/person/update/:id" exact component={PersonFormPage} />
              <Route path="/person/inspect/:id" exact component={PersonFormPage} />
              <Route path="/persons" exact component={ListPersonPage} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
      <div className="Footer">
      </div>
    </BrowserRouter>
  );
}
export default App;
