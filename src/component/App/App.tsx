import React from 'react';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';
import '../../sass/App.scss';
import logo from '../../assets/images/logo-belatrix.png';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PersonFormPage from '../../container/PersonFormPage/PersonFormPage';
import Home from '../../container/Home/Home';
import { Grid } from 'semantic-ui-react';
import { ToastContainer } from "react-toastify";
import KinshipFormPage from '../../container/KinshipFormPage/KinshipFormPage';
import ListKinshipPage from '../../container/ListKinship/ListkinshipPage';
import InspectKindship from '../../container/ListKinship/InspectKindshipPage';
import TreePage from '../../container/Tree/TreePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Grid>
          <Grid.Row className="App-header">
            <Link to="/">
              <Grid.Column>
                <img src={logo} className="App-logo" alt="logo" />
              </Grid.Column>
            </Link>
          </Grid.Row>
          <Grid.Row className="Body">
            <Grid.Column>
              <ToastContainer></ToastContainer>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/person/create" exact component={PersonFormPage} />
                <Route path="/person/update/:id" exact component={PersonFormPage} />
                <Route path="/person/inspect/:id" exact component={PersonFormPage} />
                <Route path="/persons" exact component={ListPersonPage} />
                <Route path="/kinships" exact component={ListKinshipPage} />
                <Route path="/kinship/create" exact component={KinshipFormPage} />
                <Route path="/kinship/update/:id" exact component={KinshipFormPage} />
                <Route path="/person/inspect/kinships/:id" exact component={InspectKindship} />
                <Route path="/Tree/TreeComponent" exact component={TreePage}/>
                <Route class component={NotFound} />
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

const NotFound = () => <div className="page_not_found"><img src="https://desarrollowp.com/wp-content/uploads/2018/01/error-404.jpg" alt=""/></div>;
export default App;
