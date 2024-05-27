import React, { Component } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PasswordForgot from "./components/PasswordForgot/PasswordForgot";
import PasswordReset from "./components/PasswordReset/PasswordReset";

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
import Activation from "./components/Activation/Activation";

const isLoggedIn = () => {
  return localStorage.getItem('TOKEN_KEY') != null;
};
const SecuredRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>

      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);



export default class App extends Component {

  render() {
    // const {pathname} = this.props.location;
    return (
      <BrowserRouter>
        <Switch>
          <div>
            {isLoggedIn() && (
              <>
                <Header />
              </>
            )}
            <Route path="/register" component={Register} />
            <Route path="/login/:notify" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/activation/:token" component={Activation} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path="/profile" component={Profile} />
            <Route path="/password-forgot" component={PasswordForgot} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/" exact component={Login} />
            {isLoggedIn() && <Footer />}
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}