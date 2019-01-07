/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Toast, { DURATION } from 'react-native-easy-toast'
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, RefreshControl, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator, } from 'react-navigation';
import actions from '../actions/index'
// import DataStore from '../utils/DataStore'
import Event from '../utils/EventType'
import NavigationBar from '../common/NavigationBar'
import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';
import FavoriteDao from '../utils/expand/FavoriteDao'
import PopularItem from '../common/PopularItem'
import TrendingItem from '../common/TrendingItem'
import FavoriteUtils from '../utils/FavoriteUtils'
import { FLAG_STORE } from '../utils/DataStore'
import EventBus from 'react-native-event-bus'




// const URL = 'https://api.github.com/search/repositories?q='
const tabs = ['最新', '趋势']
// const favoriteDao = new FavoriteDao(FLAG_STORE.flag_popular)
const favoriteDao_p = new FavoriteDao(FLAG_STORE.flag_popular)
const favoriteDao_t = new FavoriteDao(FLAG_STORE.flag_trending)
// const pageSize = 10
const THEME_COLOR = "#3697ff"
// const flag = FLAG_STORE.flag_popular

class CollectItem extends Component {
  constructor(props) {
    super(props);
    this.type = this.props.storeName
  }
  render() {
    const item = this.props.projectModel
    // console.log(666,this.props )
    const tabitems = this.type == 'popular' ?
      <PopularItem
        projectModel={item}
        onSelect={() => {
          NavigationUtil.navigateTo({
            projectModel: item, favoriteDao: favoriteDao_p, flag: this.type, callback: (isFavorite) => {
              // alert(1)
              item.isFavorite = isFavorite
            }
          }, 'Detail')
        }}
        // projectModel={data}
        onFavorite={(item, isFavorite) => {
          EventBus.getInstance().fireEvent(Event.popular_favorite,{ }) 
          FavoriteUtils.onFavorite(favoriteDao_p, item, isFavorite, this.type)
        }}
      ></PopularItem> :
      <TrendingItem
        projectModel={item}
        onSelect={() => {
          NavigationUtil.navigateTo({
            projectModel: item, favoriteDao: favoriteDao_t, flag: this.type, callback: (isFavorite) => {
              // alert(1)
              item.isFavorite = isFavorite
            }
          }, 'Detail')
        }}
        // projectModel={data}
        onFavorite={(item, isFavorite) => {
          EventBus.getInstance().fireEvent(Event.trending_favorite,{ }) 
          FavoriteUtils.onFavorite(favoriteDao_t, item, isFavorite, this.type)
        }}
      ></TrendingItem>
    return  <View>{tabitems}</View>
    
  }
}



class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: ''
    }
    // debugger
    this.flag = this.props.storeName
    // alert( this.flag)
  }
  componentWillMount() {
    this._loadData()
    EventBus.getInstance().addListener(Event.bottom_select,this.listener = (data)=>{
      if(data.to === 2){
        this._loadData(false)
      }
    })
  }

  componentWillUnmount(){
    EventBus.getInstance().removeListener(this.listener)
  }

  _loadData(loadmore) {
    const { onFetchCollect } = this.props;
    if (loadmore) {


    } else {
      onFetchCollect(this.flag)
    }

  }

  _store() {
    const { collect, storeName } = this.props
    // console.log(0, this.props)
    let store = collect[this.flag]
    if (!store) {
      store = {
        isloading: false,
        // pageIndex:1,
        projectModels: [],  //要显示的数据
      }
    }
    // console.log(0,store) 
    return store
  }

  _renderItem(data) {
    const item = data; 

    return <CollectItem
      projectModel={item}
      storeName={this.flag}
    ></CollectItem>
    // return <Text>dfsadsfdas </Text>

  }
  _getIndicator() {
    // debugger 

    return this._store().hideLoadingMore === true ? null :
      <View style={styles.nomore}>
        <ActivityIndicator size="small" color="#d3d3d3" />
      </View>

  }
  render() {
    let store = this._store()
    // console.log(store)
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={({ item }) => {
            return (
              this._renderItem(item)
              // <Text>dsfdsfasd</Text>      
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
  collect: state.collect
})
const mapDipacthToProps = dispacth => ({
  onFetchCollect: (storeName) => {
    // console.log(labelType,url,pageSize)
    dispacth(actions.onFetchCollect(storeName))
  }
})

const CollectTab = connect(mapStateToProps, mapDipacthToProps)(Tab)





class Collect extends Component {

 
  initTab() {
    // console.log('Home',this.props.nav)
    const Tabs = {}
    tabs.forEach((item, index) => {
      Tabs[item] = {
        screen: props => {
          return (
            // <View style={{height:40,overflow:'hidden'}}>
            <CollectTab {...props} storeName={item == '最新' ? 'popular' : 'trending'} />
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
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title={'收藏'}
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR
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
    return (
      <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
        {navigationBar}
        <TabNav />
      </View>
    )
  }
}


export default connect()(Collect)


const styles = StyleSheet.create({
  container: {
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
