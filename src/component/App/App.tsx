import React from 'react';
import './App.css';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';
import logo from '../../assets/images/logo-belatrix.png';
import CreatePerson from '../../containers/CreatePerson/CreatePerson';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="Body">
        <ListPersonPage></ListPersonPage>
      </div>
      <div
        className="Footer">
      </div>
    </div>
  );
}
export default App;
