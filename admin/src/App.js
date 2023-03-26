import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./views/login";
import SignUp from "./views/signup";
import Home from "./views/home";

function App() {
  const checkIfLogin = () => {
    return (
      <div>
        <Router>
          {" "}
          <Routes>
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    );
  };

  return (
    <div className='App'>
      {/* <Login /> */}
      {checkIfLogin()}
    </div>
  );
}

export default App;
