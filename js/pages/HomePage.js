
import React, { Component } from 'react';

// import {createBottomTabNavigator } from 'react-navigation';
// import {BottomTabBar} from 'react-navigation-tabs';
import { NavigationActions } from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../utils/NavigationUtil'

import { connect } from 'react-redux';
import BackPressComponent from '../common/BackPressComponent'
import ThemeDao from '../utils/expand/ThemeDao'
// const themeDao = new ThemeDao()
import actions from '../actions/index'



// // 正式内容页
class HomePage extends Component {
    constructor(props) {
        super(props);

        global.Navigator = this.props;
        this.backPressComponent = new BackPressComponent({ backPress: this.onBackPress })
    }

    componentWillMount() {
        this.props.onInitTheme()
    }
    componentDidMount() {
        this.backPressComponent.componentDidMount()
    }

    componentWillUnmount() {
        this.backPressComponent.componentWillUnmount()
    }
    onBackPress = () => {
        const {  nav } = this.props;
        const {dispatch} =  this.props.navigation
        // alert(1) 
        // return true;    
        console.log(this.props.navigation)  
        if (nav.routes[1].index === 0) {
            // console.log(0)
            return false; //返回false 没有可退页面 交给系统处理
        }
        dispatch(NavigationActions.back());
        // NavigationUtil.backTo(this.props.navigation) 
        // this.props.navigation.goBack()  
        return true;  //返回true 处理回退 
    };
    render() {
        // const {routes,index} = this.props.navigation.state;  
        // console.log('第一层路由',this.props.navigation)   
        // 设置显示的tab

        return (
            <DynamicTabNavigator {...this.props} />
        )
    }
}

const mapStateToProps = state => ({

    nav: state.nav
})
const mapDispatchToProps = dispatch => ({
    onInitTheme: () => dispatch(actions.onInitTheme())
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)