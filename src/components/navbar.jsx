import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
    state = {};

    render() {

      const {user} = this.props;

        return (
            <nav className="navbar navbar-expand-md navbar-light shadow-sm">
        <Link to="/" className="navbar-brand">
          Poster
        </Link>

        <div className="collapse navbar-collapse" id="navbarsExample04">
            
          <ul className="navbar-nav mr-auto">

              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>

            {user && (<React.Fragment>
              <li className="nav-item">
                <NavLink to="/posts" className="nav-link">
                  All Posts
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink to="/my_posts" className="nav-link">
                  My Posts
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/featured" className="nav-link">
                  Featured
                </NavLink>
              </li>
            </React.Fragment>)}

          </ul>

          <ul className="navbar-nav ml-auto">

            {!user && (<React.Fragment>
            <li className="nav-item">
              <NavLink to="/sign_in" className="nav-link">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sign_up" className="nav-link">
                Sign up
              </NavLink>
            </li>
            </React.Fragment>)}

            {user && (

              <React.Fragment>
            <li className="nav-item nav-link disabled">
                Welcome, <b>{user.name}</b>!
            </li>
            
            <li className="nav-item">
              <NavLink to="/sign_out" className="nav-link">
                Sign out
              </NavLink>
            </li>
            </React.Fragment>)}

          </ul>
        </div>
      </nav>
        );
    }
};

export default Navbar;