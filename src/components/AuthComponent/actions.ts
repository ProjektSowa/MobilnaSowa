import {authenticate} from "../../Services/Redux/endpointConnection";

interface Authenticate {
    type : "AUTHENTICATE"
    payload: Promise<any>
}

interface Logout {
    type : "LOGOUT"
}

export type SessionAction = Authenticate | Logout;

export function Auth(user: string, pass: string): Authenticate{
    return {
        type : "AUTHENTICATE",
        payload: authenticate(user, pass)
    }
}

export function logout(): Logout{
    return {
        type : "LOGOUT"
    }
}