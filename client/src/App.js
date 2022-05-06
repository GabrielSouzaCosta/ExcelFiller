import './App.scss';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-EB1HL9XW71')
ReactGA.send('page view')


function App() {
  return (

    <HashRouter>
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
