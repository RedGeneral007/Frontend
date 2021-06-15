import React from 'react'
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import Form from './common/form';
import PageHeader from './common/page_header';

import post_service from '../services/post_service';

class CreatePost extends Form {
    state = {
        data: {
            title: "",
            content: "",
            image: "",
        },
        image_name: "",
        reader_image_res: "",
        errors: {}
    }

    schema = {
        title: Joi.string().min(2).max(255).required(),
        content: Joi.string().min(2).max(1024).required(),
        image: Joi.any().allow("")
    };

    //Function with that name runs after submitting the form from current page
    submit_data = async () => {

        const data = { ...this.state.data};
        
        //If image has not been chosen - server should not recieve data for no reason
        if(!data.image) {
          delete data.image;
        }
        
        await post_service.create_post(data);

        toast("Your post is created ;)");
        this.props.history.replace("/my_posts");
    }

    //Function which clears the post image data from state
    remove_image = () => {
      const data = { ...this.state.data};
      const image = "";

      this.setState({
            data: {...data, image},
            image_name: "",
            reader_image_res: "",
          });
    }
    
    
    render() {

        //File reader responce and image name for preview purposes
        let image_preview = this.state.reader_image_res;
        let { image_name } = this.state;

        return (
          <div className="container col-12 d-flex flex-column align-items-center">
            <PageHeader title_text="Create post" />
            <div className="row">
              <div className="col-12">
                <p>Create new post</p>
              </div>
            </div>

            <div className="mt-1 col-12">
              <form onSubmit={this.user_submit} autoComplete="off">

                <div className="card d-flex flex-column" style={{minHeight:"150px"}}>
                
                  <div className="card d-flex flex-lg-row flex-sm-column">

                    {image_preview && (<div className="col-5">
                      {image_preview && (<img className="rounded pr-2 img-thumbnail bg-light shadow-sm" src={image_preview} alt=""/>)}
                      <h4>{image_name}</h4>
                    </div>)}
                    
                    <div className="card-body d-flex flex-column p-0 m-1">

                        <h5 className="card-title bg-dark text-white rounded pt-3 px-2 shadow">
                          {this.render_input("title", "Title")}
                        </h5>

                          {this.render_input("content", "Content", "textarea")}

                    </div>
                    
                    <div className="card d-flex flex-column p-2 col-xl-1 col-lg-2" >

                        {this.render_input("image", "Choose image", "file")}
                        {image_preview && (<button type="button" className="btn btn-danger position-relative fixed-bottom m-0" onClick={this.remove_image}>Remove image</button>)}
                      
                    </div>

                  </div>
                        {this.render_button("Create Post")}

                </div>
                
              </form>
            </div>
            
          </div>
          
        );
      }
}


export default CreatePost;