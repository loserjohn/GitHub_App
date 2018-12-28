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

const pageSize = 10

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
  _loadData(loadmore){
    const {onLoadMorePopular,onFetchData,storeName } = this.props; 
   
    const store = this._store()
    console.log('tab',storeName)   
    if(loadmore){ 
      onLoadMorePopular(storeName,store.pageIndex+1,pageSize,store.items,(res)=>{
          alert(res) 
      })

    }else{
       onFetchData(storeName,pageSize)   
    }
   
  }
  _store(){
    const {popular,storeName} = this.props 
   
    let store  = popular[storeName]  
      
    if(!store){
      store = {
        items:[],
        isloading:false,
        // pageIndex:1,
        projectModes:[],  //要显示的数据
        hideLoadingMore:true //默认隐藏加载更多 
      } 
    } 
    // console.log(0,store) 
    return store
  }

  _renderItem(data){
    const item  = data;
    return  <PopularItem 
        item = {item}
        onSelect={()=>{

        }}
    ></PopularItem>
  }
  _getIndicator(){
    return this._store().hideLoadingMore?null:
    <View style={styles.nomore}>
      <Text>没有数据</Text> 
    </View>
  }
  render(){
    const {storeName,popular} = this.props
    let store  = this._store()
    // const renderItem  = this._renderItem() 
    return (   
      <View style={styles.container}>
         <FlatList
           data={store.projectModes}
           renderItem={({item}) =>{ 
             return(
              this._renderItem(item) 
             )
           }} 
          //  keyExtractor = {}
           onEndReachedThreshold = {0.1} 

           refreshControl = {
                <RefreshControl
                refreshing={store.isloading} 
                onRefresh = {()=>{this._loadData(false)}} 
                colors = {["#3697ff"  ]}
                // enabled = {true}
                tintColor = "red"
                storeName = '客官请稍后' 
            />
           }
           refreshing = {store.isloading}

           ListFooterComponent = {()=>{
             return (<View style={styles.nomore}>
              <Text>没有数据</Text> 
            </View>) 
           }}
           onEndReached={()=>{
             setTimeout(()=>{
              if(this.canLoadMore){
                this._loadData(true);
                this.canLoadMore = false
               }
             },100)
                        
           }}
           onMomentumScrollBegin={()=>{
             this.canLoadMore = true;
           }} 
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
    dispacth(actions.onFetchData(labelType,pageSize))
  } ,
  onLoadMorePopular:(labelType,pageIndex,pageSize,dataArray,callback)=>{ 
    dispacth(actions.onLoadMorePopular(labelType,pageIndex,pageSize,dataArray,callback))
  }  
})

const PopularTab = connect(mapStateToProps,mapDipacthToProps)(Tab)





class PopularPage extends Component {

  initTab(){
    // console.log('Home',this.props.nav)
    const Tabs = {}
    tabs.forEach((item,index)=>{ 
        Tabs[item] = {
          screen: props=>{return(<PopularTab {...props} storeName = {item}/>)},
          navigationOptions:{
              storeName:item,
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
  nomore:{
    justifyContent: 'center',
    flexDirection: 'row', 
  }
});
