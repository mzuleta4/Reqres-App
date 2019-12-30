import AuthActionType from "../ActionTypes/AuthActionType";
import ActionModel from "../../Models/ActionModel";

const initialState: any = {logged: !!localStorage.getItem('token')};

export default (state = initialState, {type, payload}: ActionModel<any>) => {
    switch (type) {
        case AuthActionType.login:
            return {...state, email: payload.email, logged: true, token: payload.token};
        case AuthActionType.logout:
            return {...state, logged: false};
        case AuthActionType.validateToken:
            return {...state, logged: payload};
        default:
            return {...state};
    }
}