/**
 * react-native 的基础实现
 * android 版本
 */

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store/store';
import AppNavigators from './AppNavigators.js'
// const store = initStore();
// console.log(store)
// const Navigator = router.Navigator;
export default class App extends Component{
  render() {
    return (
        <Provider store={store}>
            <AppNavigators/>
        </Provider>
    );
  }
}
