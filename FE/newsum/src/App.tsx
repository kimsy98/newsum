import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SignUp1 from './page/signup/signUp1';
import SignUp2 from './page/signup/signUp2';
import SignUp3 from './page/signup/signUp3';

//import pages
import Card from './components/news/CardSlot';

import Short from './page/short/Short';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/card" element={<Card />} />
          <Route path="/test" element={<Short />} />
=======
          <Route path='/signup/1' element={<SignUp1 />}/>
          <Route path='/signup/2' element={<SignUp2 />}/>
          <Route path='/signup/3' element={<SignUp3 />}/>
          {/* <Route path='/test' element={<Test />}/> */}
>>>>>>> ba0f6c4f37528dfd8464e807a25f4e40231edaf1
        </Routes>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
<<<<<<< HEAD
=======

>>>>>>> ba0f6c4f37528dfd8464e807a25f4e40231edaf1
    </div>
  );
}

export default App;
