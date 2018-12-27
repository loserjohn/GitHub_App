
import React, {Component} from 'react';
import { BackHandler} from 'react-native';
// import {createBottomTabNavigator } from 'react-navigation';
// import {BottomTabBar} from 'react-navigation-tabs';
import { NavigationActions } from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtil from '../utils/NavigationUtil'
// import PopularPage from './PopularPage'
// import TrendPage from './TrendPage'
// import ColletPage from './ColletPage'
// import MinePage from './MinePage'

// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
// 预制页面
// const Pages = {
//     PopularPage: {
//         screen: PopularPage,
//         navigationOptions:{
//             header:null,
//             title:'最热',
//             tabBarIcon:({focused,tintColor})=>{
//                 return (
//                     <MCIcon name="chili-hot"  size={16} color = {focused?tintColor:'#404040'}></MCIcon>
//                 )
//             }    
//         }
//     },
//     TrendPage: {
//         screen: TrendPage,
//         navigationOptions:{
//             header:null,
//             title:'趋势',
//             tabBarIcon:({focused,tintColor})=>{
//                 return (
//                     <MCIcon name="trending-up"  size={16} color = {focused?tintColor:'#404040'}></MCIcon>
//                 )
//             }    
//         }
//     }, 
//     ColletPage: {
//         screen: ColletPage,
//         navigationOptions:{
//             header:null,
//             title:'收藏',
//             tabBarIcon:({focused,tintColor})=>{
//                 return (
//                     <MIcon name="collections"  size={16} color = {focused?tintColor:'#404040'}></MIcon>
//                 )
//             }    
//         }
//     },
//     MinePage: {
//         screen: MinePage,
//         navigationOptions:{
//             header:null,
//             title:'我的',
//             tabBarIcon:({focused,tintColor})=>{
//                 return (
//                     <MIcon name="person"  size={16} color = {focused?tintColor:'#404040'}></MIcon>
//                 )
//             }    
//         }
//     }
// }  
// // TabBarComponent
// class TabBarComponent extends Component {
//     constructor(props){
//         super(props);
//         // this.theme = {
//         //     tinColor:props.activeTintColor,
//         //     updatedTime:new Date().getTime()
//         // }
//     }
//     render(){    
       
//         return <BottomTabBar 
//             {...this.props}
//             activeTintColor = {this.props.theme}
//             // upperCaseLabel = {true}
//             // showLabel  = {false} 
//         />
//     }
// } 


// // 正式内容页
// class HomePage extends Component {
//     constructor(props){
//         super(props);
      
//         global.Navigator = this.props
//     }
//     initNav(){
//         console.log('Tab222',this.props.nav) 
//         if(this.Tabs ){
//             return this.Tabs 
//         }
//         const { PopularPage , TrendPage,ColletPage ,MinePage } = Pages;
//         const Tabpage = {PopularPage,TrendPage,ColletPage,MinePage};
//         // 创建底部标签栏
//         const TabBar = createBottomTabNavigator(Tabpage,{  
//             initialRouteName :'PopularPage', 
//             tabBarComponent:props=>{
//                 return <TabBarComponent theme={this.props.theme} {...props} />
//             } 
//         })
//         console.log('TabBar',TabBar.router) 
//         return this.Tabs = TabBar
//     }
//     render(){
//         // const {routes,index} = this.props.navigation.state;  
//         // console.log('第一层路由',this.props.navigation)   
//         // 设置显示的tab
//         const TabBar = this.initNav()
        
//         return <TabBar />
//     }
// }

// // 正式内容页
class HomePage extends Component {
    constructor(props){
        super(props);
      
        global.Navigator = this.props
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
      }
      onBackPress = () => {
        const { dispatch, nav } = this.props;

    //    console.log(111,this.props)   
        if (nav.routes[1].index === 0) {
          return false; //返回false 没有可退页面 交给系统处理
        }
    
        dispatch(NavigationActions.back());
        // this.props.navigation.goBack()
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