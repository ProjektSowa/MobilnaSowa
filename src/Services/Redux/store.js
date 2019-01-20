"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_promise_middleware_1 = __importDefault(require("redux-promise-middleware"));
const reducers_1 = require("./reducers");
exports.store = redux_1.createStore(reducers_1.rootReducer, redux_1.applyMiddleware(redux_promise_middleware_1.default()));
