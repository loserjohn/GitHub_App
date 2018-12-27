import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

import {middleware} from '../AppNavigators'

// 自定义中间件
// const logger = store => next => action =>{
//     if(typeof action === 'function'){
//         console.log('dispatch a fun')
//     }else{
//         console.log('dispacth',action);
//     }
//     const result = next(action);
//     console.log('nextState',store.getState())
// }


const middlewares = [middleware ,thunk]

export default createStore(rootReducer,applyMiddleware(...middlewares));