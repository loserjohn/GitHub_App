
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator } from 'react-navigation';
import {BottomTabBar} from 'react-navigation-tabs';
// import {BottomTabBar} from  'react-navigation-tabs';

import PopularPage from '../pages/PopularPage'
import TrendPage from '../pages/TrendPage'
import ColletPage from '../pages/ColletPage'
import MinePage from '../pages/MinePage'
import EventBus from 'react-native-event-bus'
import Event from '../utils/EventType'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
// 预制页面
const Pages = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions:{
            header:null,
            title:'最热',
            tabBarIcon:({focused,tintColor})=>{
                return (
                    <MCIcon name="chili-hot"  size={16} color = {focused?tintColor:'#404040'}></MCIcon>
                )
            }    
        }
    },
    TrendPage: {
        screen: TrendPage,
        navigationOptions:{
            header:null,
            title:'趋势',
            tabBarIcon:({focused,tintColor})=>{
                return (
                    <MCIcon name="trending-up"  size={16} color = {focused?tintColor:'#404040'}></MCIcon>
                )
            }    
        }
    }, 
    ColletPage: {
        screen: ColletPage,
        navigationOptions:{
            header:null,
            title:'收藏',
            tabBarIcon:({focused,tintColor})=>{
                return (
                    <MIcon name="collections"  size={16} color = {focused?tintColor:'#404040'}></MIcon>
                )
            }    
        }
    },
    MinePage: {
        screen: MinePage,
        navigationOptions:{
            header:null,
            title:'我的',
            tabBarIcon:({focused,tintColor})=>{
                return (
                    <MIcon name="person"  size={16} color = {focused?tintColor:'#404040'}></MIcon>
                )
            }    
        }
    }
}  
// TabBarComponent
class TabBarComponent extends Component {
    constructor(props){
        super(props);
        // this.theme = {
        //     tinColor:props.activeTintColor,
        //     updatedTime:new Date().getTime()
        // }
    }
    render(){    
       
        return <BottomTabBar 
            {...this.props}
            activeTintColor = {this.props.theme}
            // upperCaseLabel = {true}
            // showLabel  = {false} 
        />
    }
} 


// 正式内容页
class DynamicTabNavigator extends Component {
    constructor(props){
        super(props);
        console.disableYellowBox = true;
        // global.Navigator = this.props
    }
    initNav(){
        // console.log('Tab222',this.props.nav) 
        if(this.Tabs ){
            return this.Tabs 
        }
        const { PopularPage , TrendPage,ColletPage ,MinePage } = Pages;
        const Tabpage = {PopularPage,TrendPage,ColletPage,MinePage};
        // 创建底部标签栏
        const TabBar = createBottomTabNavigator(Tabpage,{  
            initialRouteName :'MinePage', 
            tabBarComponent:props=>{
                return <TabBarComponent theme={this.props.theme} {...props} />
            } 
        })
        // console.log('TabBar',TabBar.router) 
        return this.Tabs = TabBar
    }
    render(){
        // const {routes,index} = this.props.navigation.state;  
        // console.log('第一层路由',this.props.navigation)   
        // 设置显示的tab
        const TabBar = this.initNav()
        
        return <TabBar onNavigationStateChange = {(prevState,nextState,action)=>{
            // console.log(prevState,nextState,action) 
            EventBus.getInstance().fireEvent(Event.bottom_select,{
                from: prevState.index,
                to: nextState.index
            })
        }}/>
    }
}

const mapStateToProps = state =>({
    theme:state.theme.theme,
    nav:state.nav
})

export default connect(mapStateToProps)(DynamicTabNavigator)