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
import DataStore from '../utils/DataStore'

import NavigationBar from '../common/NavigationBar'
import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';

import PopularItem from '../common/PopularItem'

const URL = 'https://api.github.com/search/repositories?q='
const tabs = ['php', 'java', 'node', 'js', 'C', 'C#', '.Net']

const pageSize = 10
const THEME_COLOR = "#3697ff" 



class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: ''
    }
  }
  componentWillMount() {
    this._loadData()
  }
  _loadData(loadmore) {
    const { onLoadMorePopular, onFetchData, storeName } = this.props;
    const url = this._getUrl(storeName)
    const store = this._store()
    // console.log('tab', storeName)
    if (loadmore) {
      onLoadMorePopular(storeName, store.pageIndex + 1, pageSize, store.items, (res) => {
        this.refs.toast.show(res);
      })

    } else {
      onFetchData(storeName,url, pageSize)
    }

  }
  _getUrl(key){
    return URL + key  +'&sort=stars'
  }
  _store() {
    const { popular, storeName } = this.props

    let store = popular[storeName]

    if (!store) {
      store = {
        items: [],
        isloading: false,
        // pageIndex:1,
        projectModes: [],  //要显示的数据
        hideLoadingMore: true //默认隐藏加载更多 
      }
    }
    // console.log(0,store) 
    return store
  }

  _renderItem(data) {
    const item = data;
    return <PopularItem
      item={item}
      onSelect={() => {
        // alert(1)
        
        // const props = {...this.props,itemData:data}
        // console.log(props) 
        NavigationUtil.navigateTo({projectModel:data},'Detail',) 
      }}
      projectModel={data}
      onFavorite={()=>{}}
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
          data={store.projectModes}
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

          // ListFooterComponent={() => { 
          //   return this._getIndicator() 
          // }}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this._loadData(true);
                this.canLoadMore = false
              }
            }, 100)

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
    dispacth(actions.onFetchData(labelType, url,pageSize))
  }, 
  onLoadMorePopular: (labelType, pageIndex, pageSize, dataArray, callback) => {
    dispacth(actions.onLoadMorePopular(labelType, pageIndex, pageSize, dataArray, callback))
  }
})

const PopularTab = connect(mapStateToProps, mapDipacthToProps)(Tab)





class PopularPage extends Component {

  initTab() {
    // console.log('Home',this.props.nav)
    const Tabs = {}
    tabs.forEach((item, index) => {
      Tabs[item] = {
        screen: props => { return (
          // <View style={{height:40,overflow:'hidden'}}>
          <PopularTab {...props} storeName={item} />
          // </View>
            
         
          ) },
        navigationOptions: {
          storeName: item,
          header: null
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
    const Tabs = this.initTab()
    const TabNav = createMaterialTopTabNavigator(Tabs, {
      swipeEnabled: true,
      tabBarOptions: {
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          // width: 100,
        },
        style: {
          backgroundColor: '#3697ff',
          height:40,
          overflow:'hidden'
        },
        indicatorStyle: {
          backgroundColor: '#b9d1ff'
        },
        scrollEnabled: true
      },
      lazy: true
    })
    return (
      <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
      {navigationBar}
        <TabNav />
      </View>
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
  nomore: {
    justifyContent: 'center',
    flexDirection: 'row',
    lineHeight: 40
  }
});
