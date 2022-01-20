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
                    console.log(res)
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
                     console.log(res)
                     const json = await res.json();
                     const { entities } = normalize({'users':json}, usersSchema)
                     return entities;
                 },
                 meta: { actionType: 'ADD_ONE' }
            },
            types.USERS_ADD_FAILURE
        ]
    })
 }
