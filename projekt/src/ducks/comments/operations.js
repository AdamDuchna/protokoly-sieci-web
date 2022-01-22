import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types";

const commentSchema = new schema.Entity('comments');
const commentsSchema = new schema.Array(commentSchema);

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
                    console.log(res)
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
                     console.log(res)
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