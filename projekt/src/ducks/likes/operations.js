import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types";

const likeSchema = new schema.Entity('likes');
const likesSchema = new schema.Array(likeSchema);

export const getLikes = () => {
   return createAction({
       endpoint: 'http://localhost:5000/likes',
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
       },
       types: [
           types.LIKES_LIST_REQUEST,
           {
                type: types.LIKES_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    
                    const json = await res.json();
                    const { entities } = normalize(json, likesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.LIKES_LIST_FAILURE
       ]
   })
}

export const addLikes = (likes) => {
    return createAction({
        endpoint: 'http://localhost:5000/likes',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
        types: [
            types.LIKES_ADD_REQUEST,
            {
                 type: types.LIKES_ADD_SUCCESS,
                 payload: async (action, state, res) => {
                     
                     const json = await res.json();
                     const { entities } = normalize(json, likeSchema)
                     return entities;
                 },
                 meta: { actionType: 'ADD_ONE' }
            },
            types.LIKES_ADD_FAILURE
        ]
    })
 }


 export const editLikes = (likes) => {
    return createAction({
        endpoint: `http://localhost:5000/likes/${likes._id}`,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(likes),
        types: [
            types.LIKES_EDIT_REQUEST,
            {
                 type: types.LIKES_EDIT_SUCCESS,
                 payload: async (action, state, res) => {
                     const json = await res.json();
                     const { entities } = normalize(json, likeSchema)
                     return entities;
                 },
                 meta: { actionType: 'UPDATE_ONE' }
            },
            types.LIKES_EDIT_FAILURE
        ]
    })
 }

 export const deleteLikes = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/likes/${id}`,
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        types: [
            types.LIKES_DELETE_REQUEST,
            {
                 type: types.LIKES_DELETE_SUCCESS,
                 payload: async (action, state, res) => {
                    const json = await res.text();
                    const toReturn = {"likes":{undefined:{id:json}}}
                    return toReturn;
                 },
                 meta: { actionType: 'DEL_ONE' }
            },
            types.LIKES_DELETE_FAILURE
        ]
    })
 }

 export const mqttDelLikes = (likes) => {
    const toReturn = {"likes":{undefined:{id:likes}}}
    return{
    type: types.LIKES_DELETE_SUCCESS,
    payload: toReturn,
    meta: {actionType: 'DEL_ONE'}
}};

export const mqttEditLikes = (likes) => {
    const {entities} = normalize(likes, likeSchema)
    return{
    type: types.LIKES_EDIT_SUCCESS,
    payload: entities,
    meta: {actionType: 'UPDATE_ONE'}
}};

export const mqttAddLikes = (likes) => {
    const {entities} = normalize(likes, likeSchema)
    return{
    type: types.LIKES_ADD_SUCCESS,
    payload: entities,
    meta: {actionType: 'ADD_ONE'}
}};