import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import Login from "./layouts/Login"
import Chat from "./layouts/Chat"
import  './App.css';

const App = () => {

    return (

        <Switch>
            <Route path="/admin">
                <AdminLayout />
            </Route>
            <Route exact path="/" component={Login} />
            <Route exact path="/Chat_history/:id/:mail" component={Chat} />
        </Switch>
    )
}
export default App