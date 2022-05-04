import './App.scss';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
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
