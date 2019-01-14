/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Toast, { DURATION } from 'react-native-easy-toast'
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, RefreshControl,DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, } from 'react-navigation';
import actions from '../actions/index'
// import DataStore from '../utils/DataStore'

import NavigationBar from '../common/NavigationBar'
import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';

import PopularItem from '../common/PopularItem'
import FavoriteDao from '../utils/expand/FavoriteDao'
import {FLAG_STORE} from '../utils/DataStore'
import FavoriteUtils from '../utils/FavoriteUtils'
import EventBus from 'react-native-event-bus'
import Event from '../utils/EventType'
import {LANGUAGE_FLAG} from '../utils/expand/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q='
let tabs = []
const favoriteDao = new FavoriteDao(FLAG_STORE.flag_popular)

const pageSize = 10
const THEME_COLOR = "#3697ff" 
const flag = FLAG_STORE.flag_popular


class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: '',
      switchFavorite:false
    }
  }
  componentWillMount() {
    this._loadData()
    EventBus.getInstance().addListener(Event.popular_favorite,(data)=>{
      this.setState({switchFavorite:true})
    })
    EventBus.getInstance().addListener(Event.bottom_select,this.listener = (data)=>{
      if(data.to===0 && this.state.switchFavorite){
        this._loadData()
      }
    })
  }

  componentWillUnmount(){
    EventBus.getInstance().removeListener(this.listener)
  }
  _loadData(loadmore) {
    const { onLoadMorePopular, onFetchData, storeName } = this.props;
    const url = this._getUrl(storeName)
    const store = this._store()
    // console.log('tab', storeName)
    if (loadmore) {
      onLoadMorePopular(storeName, store.pageIndex + 1, pageSize, store.items, (res) => {
        this.refs.toast.show(res);
      },favoriteDao)

    } else {
      onFetchData(storeName,url, pageSize,favoriteDao,flag)
    }

  }
  _getUrl(key){
    return URL + key  +'&sort=stars'
  }
  _store() {
    const { popular, storeName } = this.props
    // debugger  
    let store = popular[storeName]

    if (!store) {
      store = {
        items: [],
        isloading: false,
        // pageIndex:1,
        projectModels: [],  //要显示的数据
        hideLoadingMore: true //默认隐藏加载更多 
      }
    }
    // console.log(0,store) 
    return store 
  }

  _renderItem(data) {
    const item = data; 
    return <PopularItem
      projectModel={item}
      onSelect={() => {
        NavigationUtil.navigateTo({projectModel:data,favoriteDao:favoriteDao,flag:flag,callback:(isFavorite)=>{
          // alert(1)
          data.isFavorite = isFavorite 
        }},'Detail',) 
      }}
      // projectModel={data}
      onFavorite={(item,isFavorite)=>{

        FavoriteUtils.onFavorite(favoriteDao,item,isFavorite,flag)
      }}
    ></PopularItem>
    
    }
  _getIndicator() {
    // debugger 

    return this._store().hideLoadingMore === true  ? null: 
      <View style={styles.nomore}>
        <ActivityIndicator size="smcall" color="#d3d3d3" />
      </View>   
      
  }
  render() {
    let store = this._store()
    // const renderItem  = this._renderItem() 
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={({ item }) => {
            return (
              this._renderItem(item)
            )
          }}
          //  keyExtractor = {}
          onEndReachedThreshold={0.1}

          refreshControl={
            <RefreshControl
              refreshing={store.isloading}
              onRefresh={() => { this._loadData(false) }}
              colors={["#3697ff"]}
              // enabled = {true}
              tintColor="red"
              storeName='客官请稍后'
            />
          }
          refreshing={store.isloading}

          ListFooterComponent={() => { 
            return <Text>more</Text> 
          }}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this._loadData(true);
                this.canLoadMore = false
              }
            }, 10)

          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
          }}
        ></FlatList>
        <Toast
          ref="toast"
          position='center'
          opacity={0.8}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  popular: state.popular
})
const mapDipacthToProps = dispacth => ({
  onFetchData: (labelType,url,pageSize) => { 
    // console.log(labelType,url,pageSize)
    dispacth(actions.onFetchData(labelType, url,pageSize,favoriteDao))
  }, 
  onLoadMorePopular: (labelType, pageIndex, pageSize, dataArray, callback,favoriteDao) => {
    dispacth(actions.onLoadMorePopular(labelType, pageIndex, pageSize, dataArray, callback,favoriteDao))
  }
})

const PopularTab = connect(mapStateToProps, mapDipacthToProps)(Tab)





class PopularPage extends Component { 
  componentDidMount(){
    this.props.onRreshLanguage(LANGUAGE_FLAG.keys)   
  }


  initTab() {
   const {langs} = this.props
    const Tabs = {}
 
 
      tabs = langs 
      // console.log('langs',tabs)    
   
    tabs.forEach((item, index) => {
      if(item.checked){
        Tabs[item.name] = {
          screen: props => { return (
            <PopularTab {...props} storeName={item.name} />  
            ) },
          navigationOptions: {
            storeName: item.name,
            header: null
          }
        }
      }
      
    })
    return Tabs
  }
  render() {
    let statusBar = {
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }
    let navigationBar = <NavigationBar 
      title={'最热'}
      statusBar = {statusBar}
      style={{
        backgroundColor:THEME_COLOR
      }}
    />
    // console.log(this.props.langs) 
    // debugger  
    const Tabs = this.props.langs && this.initTab()

    const TabNav =this.props.langs?  createMaterialTopTabNavigator(Tabs, {

      // tabBarComponent:
      //   ()=>{
      //     return <Text>dasf </Text> 
      //   } ,
      tabBarOptions: {
        activeTintColor :'#3697ff', 
        labelStyle: {
          fontSize: 12,
          color:'#757575' 
        },
        // tabStyle: {
        //   width:80,   
        //   paddingHorizontal:10,
        //   // marginHorizontal:10,
        //   borderWidth:1,
        //   borderColor:'#eee',
        //   borderRadius:20   ,
        //   height:24,  
        // },  
        style: {
          backgroundColor: '#fff',
          height:40,  
          // paddingVertical:8,
          overflow:'hidden',
          // alignItems:'center'
        },
        indicatorStyle: {
          // height:4,
          backgroundColor: '#3697ff'
        },
        scrollEnabled: true
      },
      lazy: true
    }):null
    return (
      <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}} >
      {navigationBar}
     {TabNav &&  <TabNav />}  
      </View>
    )
  }
}
const mapPopularStateToProps = state => ({
  langs: state.langs[LANGUAGE_FLAG.keys]  
}) 

const mapPopularDipacthToProps = dispacth => ({
  onRreshLanguage: (flag) => { 
    // console.log(labelType,url,pageSize)
    dispacth(actions.onRreshLanguage(flag))
  }
})

export default connect(mapPopularStateToProps,mapPopularDipacthToProps)(PopularPage)


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
  nomore: {
    justifyContent: 'center',
    flexDirection: 'row',
    lineHeight: 40
  }
});
