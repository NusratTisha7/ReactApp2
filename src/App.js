import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import Login from "./layouts/Login";
import { AuthProvider } from "./utils/auth";
const App = () => {

    return (

        <Switch>
            <Route path="/admin">
                <AdminLayout />
            </Route>
            <Route exact path="/" component={Login} />
        </Switch>
    )
}
export default App