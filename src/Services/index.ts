import {deleteReq, get, post, put, setHeaderToken} from "../Network";

export function login(params: any): any {
    return post("/api/login", params).then(res => {
        if (res) {
            localStorage.setItem('token', res.token);
            setHeaderToken(res.token);
        }
        return res;
    }).catch((reason: any) => {
        return reason;
    });
}

export function signUp(params: any): any {
    return post("/api/register", params).then(res => {
        if (res) {
            localStorage.setItem('token', res.token);
            setHeaderToken(res.token);
        }
        return res
    }).catch((reason: any) => {
        return reason;
    });
}

export function getListUsers(page: number) {
    return get(`/api/users?page=${page}`).then(res => res).catch(reason => reason);
}

export function getListResource() {
    return get("api/unknown").then(res => res).catch(reason => reason);
}

export function createUser(params: any): any {
    return post("api/users", params).then(res => res).catch(reason => reason);
}

export function updateUser(params: any, id: number | null | undefined): any {
    return put("api/users/" + id, params).then(res => res).catch(reason => reason);
}

export function deleteUser(id: number | undefined): any | null {
    return deleteReq("/api/users/" + id).then(res => res).catch(reason => reason);
}

export function updateResource(params: any, id: number | null | undefined): any {
    return put("api/unknown/" + id, params).then(res => res).catch(reason => reason);
}

export function deleteResource(id: number | undefined): any | null {
    return deleteReq("/api/unknown/" + id).then(res => res).catch(reason => reason);
}