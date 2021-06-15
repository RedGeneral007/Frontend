import { Component } from 'react';
import { toast } from 'react-toastify';

import post_service from '../services/post_service';

class RemoveFeatured extends Component {
    state = {};

    async componentDidMount() {
        //Receiving unique _str of post from id which provided in url
        const post_id = this.props.match.params.id;

        await post_service.delete_from_featured(post_id);

        toast("Post removed from featured! :)");
        this.props.history.goBack();
    }

    render() {
        return null;
    };

}

export default RemoveFeatured;