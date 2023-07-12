import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Router, Redirect, Route, Link, Routes, Switch} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" exact Component={Homescreen}/>
          <Route path='/home' exact Component={Homescreen}/>
          <Route path='/book/:roomid' exact Component={Bookingscreen}/>
          <Route path='/register' exact Component={Registerscreen}/>
          <Route path='/login' exact Component={Loginscreen}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
