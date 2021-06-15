import React from 'react';
import { Link } from "react-router-dom";



const Post = ({post, current_user}) => {

    //Making complete url to get current post image from server
    const url = "http://localhost:4000/";
    let img_src = url + post.image;
    
    //Checks if current user liked post or not depending on post array which includes all user id's which liked the post
    const featured_by_me = () => {
        return post.featured_by.includes(current_user);
    }


    return (
        <div className="col-12 mt-1 mb-2" id={post._str} >

            <div className="card d-flex flex-row" style={{minHeight:"150px"}}>
                
                {post.image && (<img style={{objectFit: "cover"}} src={img_src} width="300" alt={post.title} className="rounded pr-2 img-thumbnail m-1 bg-light shadow-sm"/>)}
                
                <div className="card-body d-flex flex-column p-0 mt-1">
                    <h5 className="card-title bg-dark text-white rounded p-2 m-0 mx-1 shadow">{post.title}</h5>
                    <p className={post.image ? "card-text text-right p-1" : "card-text p-2"}>{post.content}</p>
                </div>

                {/* Button panel is not necessarily if we're not providing current user (you can see it in featured component) */}
                {current_user &&
                (<React.Fragment>

                    <div className="button_panel d-flex flex-column m-1 p-0 col-1" style={{minHeight: "100%"}}>

                        {/* If post belongs to user - he can see and use Edit and Delete buttons */}
                        {(current_user === post.creator) && 
                        (<React.Fragment>
                            <Link className="btn btn-primary mt-2" style={{width: "100%"}} to={`/my_posts/edit/${post._str}`}><i className="fas fa-pencil-alt mr-1"></i>Edit</Link>
                            <Link className="btn btn-danger position-absolute mb-2" style={{ width: "100%", bottom: "0" }} to={`/my_posts/delete/${post._str}`}><i className="far fa-trash-alt mr-1"></i>Delete</Link>
                        </React.Fragment>)
                        }
                        
                        {/* If post does not belongs to user - he can add or remove from featured this post */}
                        {(current_user !== post.creator) && (
                        <React.Fragment>
                            <Link className={featured_by_me() ? "btn far fa-heart text-danger position-absolute fixed-bottom" : "btn far fa-heart text-primary position-absolute fixed-bottom"} style={{fontSize: "32px"}} to={featured_by_me() ? `/remove_featured/${post._str}` : `/add_featured/${post._str}`}></Link>
                        </React.Fragment>)}

                    </div>

                </React.Fragment>)}

            </div>
        </div>
    )
}

export default Post;