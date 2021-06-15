import React from 'react'
import Form from './common/form';
import Joi from 'joi-browser';
import PageHeader from './common/page_header';
import post_service from '../services/post_service';
import { toast } from 'react-toastify';

class EditPost extends Form {
    state = {
      _str: "",
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

    async componentDidMount() {

      //Receiving unique _str of post from id which provided in url
        const post_id = this.props.match.params.id;

        //Recieveing post data from server and setting it to the state
        const { data } = await post_service.get_post(post_id);
        this.setState({data: this.map_to_view_model(data), _str: post_id});
    }

    //Function will recieve the post from server and returns the object with properties we need (no user_id for example, no need in it)
    map_to_view_model(post) {
        return {
            title:  post.title,
            content: post.content,
            image: post.image,
        }
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

    //Function with that name runs after submitting the form from current page
    submit_data = async () => {
        const data = { ...this.state.data};
        const { _str } = this.state;

        //If image has not been chosen - server will not recieve any info about it and delete the image
        //But if we have a string which represents previous image - server will recieve it and will not delete the image
        if(!data.image) {
            delete data.image;
        }

        await post_service.edit_post(data, _str);
        toast("Your post has been edited.");
        this.props.history.goBack();
    }


    render() {

      let image_preview;

      //Setting the variable to be correct source of image in both cases - Object from file reader or string recieved from server
      if (this.state.data.image) {
        if (typeof this.state.data.image == 'string') {
          const url = "http://localhost:4000/";
          image_preview = url + this.state.data.image;
        }
        else {
          image_preview = this.state.reader_image_res;
        }
      }
 

      return (
        <div className="container col-12 d-flex flex-column align-items-center">
          <PageHeader title_text="Edit post" />
          <div className="row">
            <div className="col-12">
              <p>Edit your post</p>
            </div>
          </div>

          <div className="mt-1 col-12">
            <form onSubmit={this.user_submit} autoComplete="off">

              <div className="card d-flex flex-column" style={{minHeight:"150px"}}>
              
                <div className="card d-flex flex-lg-row flex-sm-column">

                  <div className="col-5">
                    {image_preview && (<img className="rounded pr-2 img-thumbnail bg-light shadow-sm" src={image_preview} alt=""/>)}
                  </div>
                  
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
                      {this.render_button("Edit Post")}

              </div>
              
            </form>
          </div>
          
        </div>
        
      );
    }
}

export default EditPost;