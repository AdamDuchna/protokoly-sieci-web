import { createAction } from "redux-api-middleware";
import { schema, normalize} from 'normalizr';
import types from "./types";

const userSchema = new schema.Entity('users');
const usersSchema = new schema.Array(userSchema);

export const getUsers = () => {
   return createAction({
       endpoint: 'http://localhost:5000/users',
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
       },
       types: [
           types.USERS_LIST_REQUEST,
           {
                type: types.USERS_LIST_SUCCESS,
                payload: async (action, state, res) => {
                    
                    const json = await res.json();
                    const { entities } = normalize(json, usersSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.USERS_LIST_FAILURE
       ]
   })
}

export const addUser = (user) => {
    return createAction({
        endpoint: 'http://localhost:5000/users',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        types: [
            types.USERS_ADD_REQUEST,
            {
                 type: types.USERS_ADD_SUCCESS,
                 payload: async (action, state, res) => {
                     
                     const json = await res.json();
                     const { entities } = normalize(json, userSchema)
                     return entities;
                 },
                 meta: { actionType: 'ADD_ONE' }
            },
            types.USERS_ADD_FAILURE
        ]
    })
 }

 export const editUser = (user) => {
    return createAction({
        endpoint: `http://localhost:5000/users/${user._id}`,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        types: [
            types.USERS_EDIT_REQUEST,
            {
                 type: types.USERS_EDIT_SUCCESS,
                 payload: async (action, state, res) => {
                     const json = await res.json();
                     const { entities } = normalize(json, userSchema)
                     return entities;
                 },
                 meta: { actionType: 'UPDATE_ONE' }
            },
            types.USERS_EDIT_FAILURE
        ]
    })
 }


  export const deleteUser = (id) => {
    return createAction({
        endpoint: `http://localhost:5000/users/${id}`,
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        types: [
            types.USERS_DELETE_REQUEST,
            {
                 type: types.USERS_DELETE_SUCCESS,
                 payload: async (action, state, res) => {
                    const json = await res.text();
                    const toReturn = {"users":{undefined:{id:json}}}
                    return toReturn;
                 },
                 meta: { actionType: 'DEL_ONE' }
            },
            types.USERS_DELETE_FAILURE
        ]
    })
 }

 export const mqttDelUser = (user) => {
    const toReturn = {"users":{undefined:{id:user}}}
    return{
    type: types.USERS_DELETE_SUCCESS,
    payload: toReturn,
    meta: {actionType: 'DEL_ONE'}
}};

export const mqttEditUser = (user) => {
    const {entities} = normalize(user, userSchema)
    return{
    type: types.USERS_EDIT_SUCCESS,
    payload: entities,
    meta: {actionType: 'UPDATE_ONE'}
}};