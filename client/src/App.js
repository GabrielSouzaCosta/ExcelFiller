import './App.scss';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import About from './components/pages/About';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

ReactGA.initialize('G-EB1HL9XW71');


function App() {
  useEffect(() => {
    ReactGA.send(window.location.pathname + window.location.search);
  }, []);
  return (
    <HashRouter>
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
