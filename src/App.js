import './App.css';
import React from 'react';
import Manufacturer from './components/Manufacturer/index.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import User from './components/User/index';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className='App'>
    <NavBar />
    <Router>
        <Routes>
          <Route path='/manufacturer' element={<Manufacturer />}></Route>
          <Route path='/' element={<User />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
