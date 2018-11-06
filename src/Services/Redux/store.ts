import {applyMiddleware, createStore, Store} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import {rootReducer} from "./reducers";


export const store : Store = createStore<StoreState.All, any, any, any> (
    rootReducer,
    applyMiddleware(
        promiseMiddleware(),
    )
)

export namespace StoreState {
    export type Session = {
        isLogged : boolean
    }

    export type Language = {
        lang: any
    }

    export type All = {
        session : Session,
        lang : Language
    }
}
