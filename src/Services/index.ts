import {post, setHeaderToken} from "../Network";

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
