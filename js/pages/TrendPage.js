/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Toast, { DURATION } from 'react-native-easy-toast'
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl, DeviceEventEmitter } from 'react-native';
import { createMaterialTopTabNavigator, } from 'react-navigation';
import actions from '../actions/index'
// import DataStore from '../utils/DataStore'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from '../common/NavigationBar'
import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';
import FavoriteDao from '../utils/FavoriteDao'
import { FLAG_STORE } from '../utils/DataStore'
import TrendingItem from '../common/TrendingItem'
import TrendingDialog, { timeSpans } from '../common/TrendingDialog'
import FavoriteUtils from '../utils/FavoriteUtils'

// console.log(timeSpans) 

const tabs = ['all', 'C', 'C#', 'java', 'php', 'node', 'js', '.Net']
const favoriteDao = new FavoriteDao(FLAG_STORE.flag_trending) 
const pageSize = 10
const THEME_COLOR = "#3697ff"
const flag = FLAG_STORE.flag_trending
const URL = 'https://github.com/trending/'

let TrendType = '?since-deily'
class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: ''
    }
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('trendingSwitch', (tab) => {
      this._loadData(false)
    })
  }

  //在组件销毁的时候要将其移除
  componentWillUnmount() {
    DeviceEventEmitter.remove();
  }
  componentWillMount() {
    this._loadData()
  }
  _loadData(loadmore) {

    const { onLoadMoreTrending, onRefreshTrending, storeName } = this.props;
    const url = this._getUrl(storeName)
    // console.log(-10,storeName,url, pageSize)
    const store = this._store()
    // console.log('tab', storeName)
    if (loadmore) {
      onLoadMoreTrending(storeName, store.pageIndex + 1, pageSize, store.items, (res) => {
        this.refs.toast.show(res);
      }, favoriteDao)

    } else {
      onRefreshTrending(storeName, url, pageSize, favoriteDao)
    }

  }
  _store() {
    const { trending, storeName } = this.props

    let store = trending[storeName]

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
  _getUrl(key) {
    return URL + key + this.props.trendType
  }

  _renderItem(data) { 
    const item = data;
    // debugger 
    return <TrendingItem
      projectModel={item}
      onSelect={() => {
        NavigationUtil.navigateTo({projectModel:data,favoriteDao:favoriteDao,flag:flag,callback:(isFavorite)=>{
          // alert(1)
          data.isFavorite = isFavorite 
        }},'Detail',) 
      }}
      // projectModel={data}
      onFavorite={(item, isFavorite) => {
        // debugger 
        console.log(item, isFavorite, flag)
        FavoriteUtils.onFavorite(favoriteDao, item, isFavorite, flag)
      }}
    ></TrendingItem>
  }
  _getIndicator() {
    // debugger 

    return this._store().hideLoadingMore === true ? null :
      <View style={styles.nomore}>
        <ActivityIndicator size="smcall" color="#d3d3d3" />
      </View>

  }
  render() {
    let store = this._store()
    // console.log(0,store)
    // debugger
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
          // keyExtractor={item => '' + (item.id || item.fullName)}
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
  trending: state.trending
})
const mapDipacthToProps = dispacth => ({
  onRefreshTrending: (labelType, url, pageSize) => {
    dispacth(actions.onRefreshTrending(labelType, url, pageSize, favoriteDao))
  },
  onLoadMoreTrending: (labelType, pageIndex, pageSize, dataArray, callback,favoriteDao) => {
    dispacth(actions.onLoadMoreTrending(labelType, pageIndex, pageSize, dataArray, callback, favoriteDao))
  }
})

const TrendingTab = connect(mapStateToProps, mapDipacthToProps)(Tab)





class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeSpan: timeSpans[0]
    }
  }



  initTab() {
    // console.log('Home',this.props.nav)
    const Tabs = {}
    tabs.forEach((item, index) => {
      Tabs[item] = {
        screen: props => {
          return (
            // <View style={{height:40,overflow:'hidden'}}>
            <TrendingTab {...props} storeName={item} trendType={this.state.timeSpan} />
            // </View>


          )
        },
        navigationOptions: {
          storeName: item,
          header: null
        }
      }
    })
    return Tabs
  }
  renderTitleView() {
    return <View>
      <TouchableOpacity
        onPress={() => { this.dialog.show() }}
        underlayColor="transparent"
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            color: '#ffffff',
            fontWeight: '400'
          }}>趋势{this.state.timeSpan.showText}</Text>
          <MaterialIcons
            name={'arrow-drop-up'}
            size={22}
            style={{ color: 'white' }}
          ></MaterialIcons>
        </View>
      </TouchableOpacity>

    </View>

  }
  onSelectTimeSpan(tab) {
    this.dialog.dismiss()

    this.setState({
      timeSpan: tab
    })
    DeviceEventEmitter.emit('trendingSwitch', tab);
  }
  renderDialogView() {
    return <TrendingDialog
      ref={dialog => this.dialog = dialog}
      onSelect={tab => {
        // alert(tab)
        this.onSelectTimeSpan(tab)
      }}
    ></TrendingDialog>
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      // title={'趋势'}
      titleView={
        this.renderTitleView()
      }
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR
      }}
    />
    const Tabs = this.initTab()
    let TabNav;
    if (!this.tabNav) {
      this.tabNav = createMaterialTopTabNavigator(Tabs, {
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
            height: 40,
            overflow: 'hidden'
          },
          indicatorStyle: {
            backgroundColor: '#b9d1ff'
          },
          scrollEnabled: true
        },
        lazy: true
      })

    }
    TabNav = this.tabNav
    return (
      <View style={{ flex: 1 }}>
        {navigationBar}
        <TabNav />
        {this.renderDialogView()}
      </View>
    )
  }
}


export default connect()(TrendingPage)


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
