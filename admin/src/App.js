import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";

import Login from "./views/login";
import SignUp from "./views/signup";
import isExpiredToken from "./config/validateToken";
import Home from "./views/home";

function App() {
  const [isLogin, setLogin] = useState(isExpiredToken());
  const handleLogin = (val) => {
    setLogin(val);
  };
  const checkIfLogin = () => {
    if (!isLogin) {
      return (
        <div>
          <Router>
            {" "}
            <Routes>
              <Route exact path='/signup' element={<SignUp />} />
              <Route
                exact
                path='/login'
                element={<Login />}
                onLogin={handleLogin}
              />
              <Route exact path='/' element={redirect("/login")} />
            </Routes>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Router>
            {" "}
            <Routes>
              <Route exact path='/' element={<Home />} />
            </Routes>
          </Router>
        </div>
      );
    }
  };

  return (
    <div className='App'>
      {/* <Login /> */}
      {checkIfLogin()}
    </div>
  );
}

export default App;
