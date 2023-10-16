import './App.css';
import {Route, Routes} from 'react-router-dom'
import Login from './components/login'
import SignUp from './components/signup';
import Gallery from './components/gallery';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/gallery" element={<Gallery/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
