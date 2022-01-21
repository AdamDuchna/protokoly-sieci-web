import './App.css';
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route
} from "react-router-dom";
import UserLoginForm from './ui/forms/UserLoginForm';
import Navbar from './ui/navbar/Navbar';
import UserRegisterForm from './ui/forms/UserRegisterForm';
import PostsList from './ui/posts/PostsList';
import PostsForm from './ui/posts/PostsForm';
import PostDetail from './ui/posts/PostDetail';
function App() {
  return (
    <div className="App">
        <Router>
          <Navbar/>
            <Routes>
              <Route path='/login'><UserLoginForm/></Route>
              <Route path='/register'><UserRegisterForm/></Route>
              <Route path='/posts/add'><PostsForm/></Route>
              <Route path='/posts/:id'><PostDetail/></Route>
              <Route path='/'><PostsList/></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
