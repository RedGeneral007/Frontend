import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/common/protected_route";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./components/about";
import Home from "./components/home";
import Signin from "./components/sign_in";
import Signup from "./components/sign_up";
import Signout from "./components/sign_out";
import CreatePost from "./components/create_post";
import EditPost from "./components/edit_post";
import Posts from "./components/posts";
import MyPosts from "./components/my_posts";
import Featured from "./components/featured";
import AddFeatured from "./components/add_featured";
import RemoveFeatured from "./components/remove_featured";

import user_service from "./services/user_service";

import './App.css';

class App extends Component {
  state = {
    user: null
  };

  //Set the user object in state on mount of component (whole app in this case)
  componentDidMount() {
    const user = user_service.get_current_user();
    this.setState({user});
  }

  render () {

    const {user} = this.state;

    return (
      <div className="App d-flex flex-column min-vh-100">
          <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container-fluid flex-fill">
          <Switch>
            <ProtectedRoute path="/create_post/" component={CreatePost} />
            <ProtectedRoute path="/my_posts/edit/:id" component={EditPost} />
            <ProtectedRoute path="/featured" component={Featured} />
            <ProtectedRoute path="/add_featured/:id" component={AddFeatured} />
            <ProtectedRoute path="/remove_featured/:id" component={RemoveFeatured} />
            <ProtectedRoute path="/my_posts" component={MyPosts} />
            <ProtectedRoute path="/posts" component={Posts} />
            <Route path="/sign_out" component={Signout} />
            <Route path="/sign_up" component={Signup} />
            <Route path="/sign_in" component={Signin} />
            <Route path="/about" component={About} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
