import http from "./http_service";
import { api_url } from '../config.json';


export function create_post(post) {
    
    const form_data = new FormData();

    form_data.append('title', post.title);
    form_data.append('content', post.content);

    if (post.image) {
        form_data.append('image', post.image);
    }

    return http.post(`${api_url}/posts`, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
}

export function get_post(id) {
    return http.get(`${api_url}/posts/${id}`);
}

export function get_all_posts() {
    return http.get(`${api_url}/posts`);
}

export function delete_post(id) {
    return http.delete(`${api_url}/posts/${id}`);
}

export function get_my_posts() {
    return http.get(`${api_url}/posts/my`);
}

export function edit_post(post, post_id) {
    const form_data = new FormData();

    form_data.append('title', post.title);
    form_data.append('content', post.content);

    if (post.image) {
        form_data.append('image', post.image);
    }

    return http.put(`${api_url}/posts/${post_id}`, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
}



export function get_featured() {
    return http.get(`${api_url}/posts/featured`);
}

export function add_to_featured(id) {
    return http.post(`${api_url}/posts/featured/${id}`);
}

export function delete_from_featured(id) {
    return http.delete(`${api_url}/posts/featured/${id}`);
}


export default {
    create_post,
    get_all_posts,
    get_my_posts,
    delete_post,
    get_post,
    edit_post,
    get_featured,
    add_to_featured,
    delete_from_featured,
};