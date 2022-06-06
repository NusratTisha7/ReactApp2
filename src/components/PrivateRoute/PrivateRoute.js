import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = ({ children, ...rest }) => { 
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
                    children 
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;