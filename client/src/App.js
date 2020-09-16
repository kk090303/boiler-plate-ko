import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
   <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
		//HOC로 감싸주어 각각(null,true, false)인지에 따라 접근 허가
          <Route exact path="/" component={Auth(LandingPage, null)}/>
		  <Route exact path="/login" component={Auth(LoginPage,false)}/>
		  <Route exact path="/register" component={Auth(RegisterPage,false)}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;