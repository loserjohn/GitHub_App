/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,RefreshControl} from 'react-native';
import { createMaterialTopTabNavigator, } from 'react-navigation';
import actions  from '../actions/index'
import DataStore from '../utils/DataStore'

import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';

import PopularItem from '../common/PopularItem'
const tabs = ['java','php','node','js','C','C#','.Net']



class Tab extends Component {
  constructor(props){
    super(props);
    this.state = {
      datas:''
    }
  }
  componentWillMount(){
    this._loadData()
  }
  _loadData(){
    const {nav,popular,onFetchData,title } = this.props; 
    // console.log('tab',title)
    onFetchData(title) 
  }
  _moreData(){
    console.log('加载更多')
  }
  _renderItem(data){
    const item  = data;
    return  <PopularItem 
        item = {item}
        onSelect={()=>{

        }}
    ></PopularItem>
  }
  render(){
    const {title,popular} = this.props
    let store  = popular[title]  
    if(!store){
      store = {
        items:[],
        isloading:false
      } 
    } 
    // const renderItem  = this._renderItem()
    return (   
      <View style={styles.container}>
         <FlatList
           data={store.items}
           renderItem={({item}) =>{ 
             return(
              this._renderItem(item) 
             )
           }}
           ListEmptyComponent ={() => <Text>没有数据</Text>}
          //  keyExtractor = {}
           onEndReachedThreshold = {0.1} 
           onEndReached = {()=>{this._moreData()}}  
           refreshControl = {
                <RefreshControl
                refreshing={store.isloading} 
                onRefresh = {()=>{this._loadData()}} 
                colors = {["#3697ff"  ]}
                // enabled = {true}
                tintColor = "red"
                title = '客官请稍后' 
            />
           }
           refreshing = {store.isloading}
         ></FlatList> 
      </View> 
    )
  }
}

const mapStateToProps = state =>({
  nav:state.nav,
  popular:state.popular
})
const mapDipacthToProps = dispacth=>({
  onFetchData:(labelType)=>{
    dispacth(actions.onFetchData(labelType))
  }  
})

const PopularTab = connect(mapStateToProps,mapDipacthToProps)(Tab)





class PopularPage extends Component {

  initTab(){
    // console.log('Home',this.props.nav)
    const Tabs = {}
    tabs.forEach((item,index)=>{ 
        Tabs[item] = {
          screen: props=>{return(<PopularTab {...props} title = {item}/>)},
          navigationOptions:{
              title:item,
              header:null
          }
        }
    }) 
    return Tabs
  }
  render() {
    // const {routes,index} = this.props.navigation.state;   
    // console.log('第二层路由',this.props.navigation)
    
    const Tabs = this.initTab()
    const TabNav = createMaterialTopTabNavigator(Tabs,{ 

      swipeEnabled :true,
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          // width: 100,
        },
        style: {
          backgroundColor: '#1d85d0',
        },
        indicatorStyle :{
          backgroundColor:'#b9d1ff' 
        },
        scrollEnabled:true
      },
      lazy:true
    }) 
    return (
      <TabNav/>
    ) 
  }
}


export default connect()(PopularPage)


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF', 
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
