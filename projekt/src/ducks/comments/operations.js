import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types";

const commentSchema = new schema.Entity('comments');

export const getComments = () => {
   return createAction({
       endpoint: 'http://localhost:5000/comments',
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
       },
       types: [
           types.COMMENTS_LIST_REQUEST,
           {
                type: types.COMMENTS_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, commentSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.COMMENTS_LIST_FAILURE
       ]
   })
}

export const addComment = (comment) => {
    return createAction({
        endpoint: 'http://localhost:5000/comments',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
        types: [
            types.COMMENTS_ADD_REQUEST,
            {
                 type: types.COMMENTS_ADD_SUCCESS,
                 payload: async (action, state, res) => {
                     const json = await res.json();
                     const { entities } = normalize(json, commentSchema)
                     return entities;
                 },
                 meta: { actionType: 'ADD_ONE' }
            },
            types.COMMENTS_ADD_FAILURE
        ]
    })
 }

 export const editComment = (comment) => {
    return createAction({
        endpoint: `http://localhost:5000/comments/${comment._id}`,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
        types: [
            types.COMMENTS_EDIT_REQUEST,
            {
                 type: types.COMMENTS_EDIT_SUCCESS,
                 payload: async (action, state, res) => {
                     const json = await res.json();
                     const { entities } = normalize(json, commentSchema)
                     return entities;
                 },
                 meta: { actionType: 'UPDATE_ONE' }
            },
            types.COMMENTS_EDIT_FAILURE
        ]
    })
 }

 export const deleteComment = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/comments/${id}`,
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        types: [
            types.COMMENTS_DELETE_REQUEST,
            {
                 type: types.COMMENTS_DELETE_SUCCESS,
                 payload: async (action, state, res) => {
                    const json = await res.text();
                    const toReturn = {"comments":{undefined:{id:json}}}
                    return toReturn;
                 },
                 meta: { actionType: 'DEL_ONE' }
            },
            types.COMMENTS_DELETE_FAILURE
        ]
    })
 }