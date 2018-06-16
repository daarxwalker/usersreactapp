// LAYOUT - APP
// ---------------------------------------------
// *
// Header with React logo and title
// Content
// Footer
// *
// ---------------------------------------------

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Logo from './assets/svg/logo.svg'; // For dev purpose
import Error from './components/Error';
import UserDetail from "./components/UserDetail";
import PostDetail from "./components/PostDetail";

class App extends Component {
    render() {
        return (
            <div className="main">
                <h1 className="app-header"><img className="app-header__logo" src={Logo} alt="react-logo" />
                Users React App
                </h1>
                <BrowserRouter>
                    <Switch>
                        <Route cache={true} path="/" exact component={Home}/>
                        <Route cache={true} path="/user/:id" exact component={UserDetail}/>
                        <Route cache={true} path="/post/:id" exact component={PostDetail}/>
                        <Route cache={true} component={Error} />
                    </Switch>
                </BrowserRouter>
                <div className="footer">© 2018 All rights reserved - Dominik Linduška</div>
            </div>
        );
    }
}

export default App;
