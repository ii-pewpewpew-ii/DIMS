import './App.css';
import {Route, Routes} from 'react-router-dom'
import Login from './components/login'
import SignUp from './components/signup';
import Gallery from './components/gallery';
import BackendCall from './components/backendCall';
import FilterBar from './components/filterBar';
import GroupCat from './components/groupCat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/gallery" element={<Gallery/>}></Route>
        <Route path="/api/sessions/oauth/google" element={<BackendCall/>}></Route>
        <Route path="/test" element={<FilterBar/>}></Route>
        <Route path="/newGroup" element={<GroupCat/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
