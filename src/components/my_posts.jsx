import React, { Component } from 'react';
import { Link } from "react-router-dom";

import PageHeader from './common/page_header';
import Post from './common/post';

import post_service from '../services/post_service';
import user_service from '../services/user_service';


class MyPosts extends Component {

    state = {
        posts:[],
        current_user: "",
    };
    
    async componentDidMount() {

        //Recieveing post data from server, current user from jwt and setting it to the state
        const user = await user_service.get_current_user();
        const {data} = await post_service.get_my_posts();
        
        const current_user = user._id;

        if(data.length > 0) {
            this.setState({ posts: this.map_to_view_model(data), current_user: current_user });
        }

        return;
    }

    //Function will recieve the post from server and returns the object with properties we need (no post id for example, no need in it)
    map_to_view_model(posts) {
        for (let i = 0; i < posts.length; i++) {
            posts[i] = {
                _str: posts[i].unique_str,
                title:  posts[i].title,
                content: posts[i].content,
                image: posts[i].image,
                creator: posts[i].user_id,
                featured_by: posts[i].featured_by,
            }
        }

        return posts;
    }


    
    render() {
        const { posts } = this.state;
        const { current_user } = this.state;

        return (
            <div className="container">
                <PageHeader title_text="Your posts" />
                <div className="row">
                    <div className="col-12">
                        <p>Your posts is here</p>
                        <Link to="/create_post">+ Create new post</Link>
                    </div>
                </div>
                <div className="row">
                    {posts.length > 0 && posts.map((post) => <Post key={post._str} post={post} current_user={current_user} />)}
                </div>
            </div>
        )
    }
}

export default MyPosts;