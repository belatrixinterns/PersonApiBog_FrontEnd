import React from 'react';
import './App.css';
import Logo from '../../assets/images/logo-belatrix.png';
import ListPersonPage from '../../container/ListPerson/ListPersonPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
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
