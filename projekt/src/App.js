import './App.css';
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route
} from "react-router-dom";
import UserLoginForm from './ui/forms/UserLoginForm';
import Navbar from './ui/navbar/Navbar';
function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
            <Routes>
              <Route path='/login'><UserLoginForm/></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
