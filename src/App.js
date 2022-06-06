import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import Login from "./layouts/Login"
import Chat from "./layouts/Chat"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import  './App.css';

const App = () => {

    return (

        <Switch>
            <PrivateRoute path="/admin">
                <AdminLayout />
            </PrivateRoute >
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/Chat_history/:id/:mail">
                <Chat />
            </PrivateRoute >
            {/* <Route exact path="/Chat_history/:id/:mail" component={Chat} /> */}
        </Switch>
    )
}
export default App