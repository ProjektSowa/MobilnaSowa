"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const session_reducer_1 = require("./session.reducer");
exports.rootReducer = redux_1.combineReducers({
    session: session_reducer_1.session,
    lang: session_reducer_1.lang
});
