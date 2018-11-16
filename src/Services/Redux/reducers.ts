import {combineReducers} from "redux";
import {lang, session} from "./session.reducer";
import {StoreState} from "./store";

export const rootReducer = combineReducers ({
    session,
    lang
})

