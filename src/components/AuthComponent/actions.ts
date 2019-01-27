import {accountLink, accountAuth} from "../../Services/Redux/endpointConnection";

export enum SessionTypes {
	ACCOUNT_LINK = "AccountLink",
    ACCOUNT_AUTH = "AccountAuth",
    LOG_OUT = "LOGOUT"
}

interface IAccountLink {
    type : SessionTypes.ACCOUNT_LINK
    payload: Promise<any>
}

interface IAccountAuth {
    type : SessionTypes.ACCOUNT_AUTH
    payload: Promise<any>
}

interface Logout {
    type : SessionTypes.LOG_OUT
}

export type SessionAction = IAccountLink| IAccountAuth | Logout;

export function Auth(user: string, pass: string): IAccountLink{
    return {
        type : SessionTypes.ACCOUNT_LINK,
        payload: accountLink(user, pass)
    }
}

export function Auth2(user: string, pass: string): IAccountAuth{
    return {
        type : SessionTypes.ACCOUNT_AUTH,
        payload: accountAuth(user, pass),
    }
}

export function logout(): Logout{
    return {
        type : SessionTypes.LOG_OUT
    }
}