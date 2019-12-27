import AuthActionType from "../ActionTypes/AuthActionType";

export const initLogin = (email: string, token: string | null) => ({
    type: AuthActionType.login,
    payload: {email, token}
});