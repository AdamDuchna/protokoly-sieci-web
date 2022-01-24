import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types";

const postSchema = new schema.Entity('posts');
const postsSchema = new schema.Array(postSchema);

export const getPosts = () => {
   return createAction({
       endpoint: 'http://localhost:5000/posts',
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
       },
       types: [
           types.POSTS_LIST_REQUEST,
           {
                type: types.POSTS_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    
                    const json = await res.json();
                    const { entities } = normalize(json, postsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.POSTS_LIST_FAILURE
       ]
   })
}
export const editPost = (post) => {
    return createAction({
        endpoint: `http://localhost:5000/posts/${post._id}`,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
        types: [
            types.POSTS_EDIT_REQUEST,
            {
                 type: types.POSTS_EDIT_SUCCESS,
                 payload: async (action, state, res) => {
                     const json = await res.json();
                     const { entities } = normalize(json, postSchema)
                     return entities;
                 },
                 meta: { actionType: 'UPDATE_ONE' }
            },
            types.POSTS_EDIT_FAILURE
        ]
    })
 }

export const addPost = (posts) => {
    return createAction({
        endpoint: 'http://localhost:5000/posts',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(posts),
        types: [
            types.POSTS_ADD_REQUEST,
            {
                 type: types.POSTS_ADD_SUCCESS,
                 payload: async (action, state, res) => {
                     
                     const json = await res.json();
                     const { entities } = normalize(json, postSchema)
                     return entities;
                 },
                 meta: { actionType: 'ADD_ONE' }
            },
            types.POSTS_ADD_FAILURE
        ]
    })
 }

 export const deletePost = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/posts/${id}`,
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        types: [
            types.POSTS_DELETE_REQUEST,
            {
                 type: types.POSTS_DELETE_SUCCESS,
                 payload: async (action, state, res) => {
                    const json = await res.text();
                    const toReturn = {"posts":{undefined:{id:json}}}
                    return toReturn;
                 },
                 meta: { actionType: 'DEL_ONE' }
            },
            types.POSTS_DELETE_FAILURE
        ]
    })
 }

 export const mqttAddPost = (post) => {
    const {entities} = normalize(post, postSchema)
    return{
    type: types.POSTS_ADD_SUCCESS,
    payload: entities,
    meta: {actionType: 'ADD_ONE'}
}};

export const mqttDelPost = (post) => {
    const toReturn = {"posts":{undefined:{id:post}}}
    return{
    type: types.POSTS_DELETE_SUCCESS,
    payload: toReturn,
    meta: {actionType: 'DEL_ONE'}
}};

export const mqttEditPost = (post) => {
    const {entities} = normalize(post, postSchema)
    return{
    type: types.POSTS_EDIT_SUCCESS,
    payload: entities,
    meta: {actionType: 'UPDATE_ONE'}
}};