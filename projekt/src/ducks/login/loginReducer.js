
import { LOGIN_SET } from "./loginActions";

export const LoginReducer = (state = {}, action) => {
    switch(action.type) {
        case LOGIN_SET: 
            return action.payload;
        default:
            return state;
    }
}
