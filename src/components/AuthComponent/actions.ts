import {authenticate} from "../../Services/Redux/endpointConnection";

export enum SessionTypes {
	ACCOUNT_LINK = "AccountLink",
    LOG_OUT = "LOGOUT"
}

interface IAccountLink {
    type : SessionTypes.ACCOUNT_LINK
    payload: Promise<any>
}

interface Logout {
    type : SessionTypes.LOG_OUT
}

export type SessionAction = IAccountLink | Logout;

export function Auth(user: string, pass: string): IAccountLink{
    return {
        type : SessionTypes.ACCOUNT_LINK,
        payload: authenticate(user, pass)
    }
}

export function logout(): Logout{
    return {
        type : SessionTypes.LOG_OUT
    }
}