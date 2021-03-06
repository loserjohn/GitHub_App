
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createSwitchNavigator,createBottomTabNavigator } from 'react-navigation';
import HomePage from './pages/HomePage';
import FetchDemo from './pages/FetchDemo'
import AsyncStorageDemo from './pages/AsyncStorageDemo'
import Detail from './pages/Detail'
import WelCome from './pages/WelCome'
import WebPage from './pages/WebPage'
import DataStoreDemo from './pages/DataStoreDemo'
import AboutAuthor from './pages/AboutAuthor'
import AboutPage from './pages/AboutPage'
import CustomKey from './pages/CustomKey'
import SortKey from './pages/SortKey'
import Search from './pages/SearchPage'
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MIcon from 'react-native-vector-icons/MaterialIcons';


import {createReactNavigationReduxMiddleware,reduxifyNavigator} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux';

export const rootCom = 'Init'
// 欢迎页
const Init = createStackNavigator({
    WelCome: {
        screen: WelCome,
        navigationOptions:{
            header:null
        }
    }
})

// 正式内容页
const Main = createStackNavigator({
    
   
    // 首页的底部tab
    HomePage: {
        screen: HomePage,
        navigationOptions:{
            header:null
        }
    },
    Detail:{
        screen: Detail,
        navigationOptions:{
            headerTitle:'详情',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    FetchDemo:{
        screen: FetchDemo,
        navigationOptions:{
            headerTitle:'fetch',
            headerTitleStyle:{
                fontSize:16
            },
        }
    },
    AsyncStorageDemo:{
        screen: AsyncStorageDemo,
        navigationOptions:{
            headerTitle:'storage',
            headerTitleStyle:{
                fontSize:16
            },
        }
    },
    DataStoreDemo:{
        screen: DataStoreDemo,
        navigationOptions:{
            headerTitle:'本地缓存测试',
            headerTitleStyle:{
                fontSize:16
            },
        }
    },
    WebPage:{
        screen: WebPage,
        navigationOptions:{
            headerTitle:'教程',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    AboutPage:{ 
        screen: AboutPage,
        navigationOptions:{
            headerTitle:'关于',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    AboutAuthor:{ 
        screen: AboutAuthor,
        navigationOptions:{
            headerTitle:'关于作者',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    CustomKey:{ 
        screen: CustomKey,
        navigationOptions:{
            headerTitle:'自定义',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    SortKey:{ 
        screen: SortKey,
        navigationOptions:{
            headerTitle:'排序',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
    Search:{ 
        screen: Search,
        navigationOptions:{
            headerTitle:'排序',
            header:null,
            headerTitleStyle:{
                fontSize:16
            }
        }
    },
},{
    initialRouteName :'HomePage',
   
})

//欢迎页跳转不可返回
export const RootNavigator = createSwitchNavigator({
    Init:Init,
    Main:Main
},{
    initialRouteName :'Init'
})


/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
 
/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');
 
/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
    state: state.nav,//v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);