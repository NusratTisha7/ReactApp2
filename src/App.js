import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import Login from "./layouts/Login"

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