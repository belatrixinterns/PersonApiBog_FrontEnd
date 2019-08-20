import React from 'react';
import './App.css';
import Logo from '../../assets/images/logo-belatrix.png';
import { ListPersonTable } from '../ListPerson/ListPersonTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
      </header>
      <div className="Body">
        <ListPersonTable></ListPersonTable>
      </div>
      <div className="Footer">
        
      </div>
    </div>
  );
}

export default App;
