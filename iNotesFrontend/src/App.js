import './App.css';
import { BrowserRouter as Router, Routes,Route }
    from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navabr from './components/Navabr';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navabr/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>    
          <Route exact path='/login' element={<Login/>}/>    
          <Route exact path='/signup' element={<SignUp/>}/>    
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
