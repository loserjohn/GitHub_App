
import { combineReducers } from 'redux';
import theme from './theme'
import popular from './popular'
import trending from './trending'
import collect from './collect' 
import langs from './langs' 
import search from './search' 

import {rootCom, RootNavigator} from '../AppNavigators'
// console.log('@@@@@@@@@@@')
// console.log(RootNavigator)
//设定默认的state
const initState =RootNavigator.router.getActionForPathAndParams(RootNavigator.router.getActionForPathAndParams(rootCom));


// 创建自己的navigationreducer
const navReducer = (state = initState, action) => {
    // console.log('触发了navReducer')
    // console.log(RootNavigator.router) 

    // 判断 action 类型
   const nextState = RootNavigator.router.getStateForAction(action,state);
   return nextState || state
};

// 合并reducer
const index = combineReducers({  
    nav: navReducer,
    popular: popular,
    trending: trending,
    theme: theme,
    collect: collect,
    langs: langs ,
    search:search
})

export default index;