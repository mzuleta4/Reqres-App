import AuthActionType from "../ActionTypes/AuthActionType";

export const initLogin = (email: string, token: string | null) => ({
    type: AuthActionType.login,
    payload: {email, token}
});

export const validateToken = (logged: boolean) => ({
    type: AuthActionType.validateToken,
    payload: logged
});

export const logoutUser = () => ({
    type: AuthActionType.logout,
    payload: null
});