import React, { Component } from 'react';

import PageHeader from './common/page_header';
import Post from './common/post';

import post_service from '../services/post_service';


class Featured extends Component {

    state = {
        posts:[]
    };

    async componentDidMount() {

        //Recieveing post data from server and setting it to the state
        const {data} = await post_service.get_featured();

        if(data && data.length > 0) {
            this.setState({ posts: this.map_to_view_model(data) });
        }
        
        //Do nothing if no data from server
        return;
    }

    //Function will recieve the post from server and returns the object with properties we need (no user_id for example, no need in it)
    map_to_view_model(posts) {
        for (let i = 0; i < posts.length; i++) {
            posts[i] = {
                _str: posts[i].unique_str,
                title:  posts[i].title,
                content: posts[i].content,
                image: posts[i].image,
            }
        }

        return posts;
    }


    
    render() {
        const {posts} = this.state;

        return (
            <div className="container">
                <PageHeader title_text="Featured posts" />
                <div className="row">
                    <div className="col-12">
                        <p>Your featured posts is here</p>
                    </div>
                </div>
                <div className="row">
                    {posts && posts.length > 0 && posts.map((post) => <Post key={post._str} post={post} />)}
                </div>
            </div>
        )
    }
}

export default Featured;