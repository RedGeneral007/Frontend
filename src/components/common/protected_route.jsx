import React from 'react'
import { Redirect, Route } from 'react-router-dom';

import user_service from '../../services/user_service';

const Protected_route = ({component: Component, render, ...rest}) => {

    //Getting current user from jwt
    const user = user_service.get_current_user();

    return (
        <Route
        {...rest}
        render={
            
            (props) => {
                //Redirect to Sign in page if user didn't sign in to site
                if (!user) {
                    return <Redirect 
                    to={{
                        pathname: "/signin",
                        state: { from: props.location },
                    }}
                    />
                }

                return Component ? <Component {...props} /> : render(props);
            }
        }/>
    );
};

export default Protected_route;