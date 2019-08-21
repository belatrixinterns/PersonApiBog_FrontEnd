import React from 'react';
import './App.css';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';
import '../../sass/App.scss';
import logo from '../../assets/images/logo-belatrix.png';
import PersonFormPage from '../../containers/PersonFormPage/PersonFormPage';

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
