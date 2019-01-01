
import React, {Component} from 'react';

// import {createBottomTabNavigator } from 'react-navigation';
// import {BottomTabBar} from 'react-navigation-tabs';
import { NavigationActions } from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
// import NavigationUtil from '../utils/NavigationUtil'

import { connect } from 'react-redux';
import BackPressComponent from '../common/BackPressComponent'

// // 正式内容页
class HomePage extends Component {
    constructor(props){
        super(props);
      
        global.Navigator = this.props;
        this.backPressComponent = new BackPressComponent({backPress:this.onBackPress})
    }
    componentDidMount() {
        this.backPressComponent.componentDidMount()
      }
    
      componentWillUnmount() {
        this.backPressComponent.componentWillUnmount() 
      }
      onBackPress =() => {
        const { dispatch, nav } = this.props; 
            // alert(1) 
            // return true;    
         console.log('home里面的回调')
        if (nav.routes[1].index === 0) {
          return false; //返回false 没有可退页面 交给系统处理
        } 
        // // console.log(111,this.props) 
        dispatch(NavigationActions.back());   
        // // this.props.navigation.goBack()
        return true;  //返回true 处理回退 
      };
    render(){
        // const {routes,index} = this.props.navigation.state;  
        // console.log('第一层路由',this.props.navigation)   
        // 设置显示的tab
        
        return (
            <DynamicTabNavigator {...this.props}/>  
        )
    }
}

const mapStateToProps = state =>({
    theme:state.theme.theme,
    nav:state.nav
})

export default connect(mapStateToProps)(HomePage)