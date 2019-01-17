/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Toast, { DURATION } from 'react-native-easy-toast'
import React, { Component } from 'react';
import { ActivityIndicator, TextInput,StyleSheet, Text, View, FlatList, RefreshControl, DeviceInfo ,TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator, } from 'react-navigation';
import actions from '../actions/index'
// import DataStore from '../utils/DataStore'
import ViewUtil from '../utils/ViewUtil' 
import NavigationBar from '../common/NavigationBar'
import NavigationUtil from '../utils/NavigationUtil'
import { connect } from 'react-redux';

import PopularItem from '../common/PopularItem'
import FavoriteDao from '../utils/expand/FavoriteDao'
import { FLAG_STORE } from '../utils/DataStore'
import FavoriteUtils from '../utils/FavoriteUtils'
import EventBus from 'react-native-event-bus'
import Event from '../utils/EventType'
import { LANGUAGE_FLAG } from '../utils/expand/LanguageDao'
import GlobalStyle from '../res/styles/GlobalStyles'


const URL = 'https://api.github.com/search/repositories?q='
// let tabs = []
const favoriteDao = new FavoriteDao(FLAG_STORE.flag_popular)

const pageSize = 10
const flag = FLAG_STORE.flag_popular


class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: '',
      switchFavorite: false
    }
  }
  // componentWillMount() {
  //   // this._loadData()
  //   EventBus.getInstance().addListener(Event.popular_favorite, (data) => {
  //     this.setState({ switchFavorite: true })
  //   })
  //   EventBus.getInstance().addListener(Event.bottom_select, this.listener = (data) => {
  //     if (data.to === 0 && this.state.switchFavorite) {
  //       this._loadData()
  //     }
  //   })
  // }

  // componentWillUnmount() {
  //   EventBus.getInstance().removeListener(this.listener)
  // }
  // _loadData(loadmore) {
  //   const { onSearchData, onSearchCancel, onLoadMoreSearch,storeName } = this.props;
  //   const url = this._getUrl(storeName)
  //   const store = this._store()
  //   // console.log('tab', storeName)
  //   if (loadmore) {
  //     onLoadMoreSearch(storeName, store.pageIndex + 1, pageSize, store.items, (res) => {
  //       this.refs.toast.show(res);
  //     }, favoriteDao)

  //   } else {
  //     const keyWord = 'java'
  //     onSearchData(keyWord, this.token = new Date() , pageSize, favoriteDao)
  //   }

  // }
  // _getUrl(key) {
  //   return URL + key + '&sort=stars'
  // }
  // _store() {
  //   const { popular, storeName } = this.props
  //   // debugger  
  //   let store = popular[storeName]

  //   if (!store) {
  //     store = {
  //       items: [],
  //       isloading: false,
  //       // pageIndex:1,
  //       projectModels: [],  //要显示的数据
  //       hideLoadingMore: true //默认隐藏加载更多 
  //     }
  //   }
  //   // console.log(0,store) 
  //   return store
  // }

  // _renderItem(data) {
  //   const item = data;
  //   const { theme } = this.props
  //   return <PopularItem
  //     projectModel={item}
  //     theme={theme}
  //     onSelect={() => {

  //       NavigationUtil.navigateTo({
  //         projectModel: data, favoriteDao: favoriteDao, flag: flag, theme: theme, callback: (isFavorite) => {
  //           // alert(1)
  //           data.isFavorite = isFavorite
  //         }
  //       }, 'Detail')
  //     }}
  //     // projectModel={data}
  //     onFavorite={(item, isFavorite) => {

  //       FavoriteUtils.onFavorite(favoriteDao, item, isFavorite, flag)
  //     }}
  //   ></PopularItem>

  // }
  // _getIndicator() {
  //   return this._store().hideLoadingMore === true ? null :
  //     <View style={styles.nomore}>
  //       <ActivityIndicator size="small" color="#d3d3d3" />
  //     </View>

  // }
  render() {
    // let store = this._store()
    return (
      <View style={styles.container}>
        {/* <FlatList
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
        ></FlatList> */}
        <Text>dsfadsfds sdf </Text>
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
  search: state.search,
  theme: state.theme.theme
})
const mapDipacthToProps = dispacth => ({
  // onSearchData: (keyWord, token,storeName, pageSize, favoriteDao) => {
  //   // console.log(labelType,url,pageSize)
  //   dispacth(actions.onSearchData(keyWord, token,storeName, pageSize, favoriteDao))
  // },
  // onLoadMoreSearch: (labelType, pageIndex, pageSize, dataArray, callback, favoriteDao) => {
  //   dispacth(actions.onLoadMorePopular(labelType, pageIndex, pageSize, dataArray, callback, favoriteDao))
  // } 
})

const PopularTab = connect(mapStateToProps, mapDipacthToProps)(Tab)





class SearchPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      keyWord:'php'
    }
  }
  componentDidMount() { }
  // 搜索操作
  DoSearch(){
    // alert(this.state.keyWord);
    const { onSearchData,onSearchCancel} =  this.props
    let keyWord = this.state.keyWord
    onSearchData(keyWord,new Date().getTime(),pageSize, favoriteDao) 
    this.refs.keyInput.blur()
  }
  // 右边的按钮
  renderRightButton() {
    return <View style={{ flexDirection: 'row' }}> 
      <TouchableOpacity
        onPress={() => {
         
        }}
        underlayColor="transparent"
      >
       <Text style={styles.searchText} onPress={()=>{this.DoSearch()}}>搜索</Text>
      </TouchableOpacity>
    </View>
  }
  // 中间的搜索模块
  rendnerTitleView(){
     return <TextInput style={styles.inputBox} placeholder={'请输入关键词'}
      autoFocus={true}
      defaultValue='php'
      placeholderTextColor ={'#eee'}
      onChangeText={(text) => this.setState({
        keyWord:text
      })}
      ref = "keyInput"
      >

     </TextInput> 

  }
  render() {
    const { theme } = this.props

    // 导航
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      statusBar={statusBar}
      rightButton={this.renderRightButton()}
      leftButton={ViewUtil.getLeftBackButton(() => { this.back() })}
      titleView = {this.rendnerTitleView()} 
      style={{ 
        backgroundColor: theme
      }}
    />
    // 底部按钮
    let bottomBtn = <View style={styles.btnBox}>
      <TouchableOpacity style={styles.btn} onPress={()=>{}}>
        <Text style={GlobalStyle.cm_btn}>朕收下了</Text>
      </TouchableOpacity>
    </View>

    return (
      <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }} >
        {navigationBar}
        <PopularTab></PopularTab> 
        {bottomBtn}
      </View>
    )
  }
}
const mapSearchStateToProps = state => ({
  theme: state.theme.theme,
})

const mapSearchDipacthToProps = dispacth => ({
  onSearchCancel: (token) => {
    // console.log(labelType,url,pageSize)
    dispacth(actions.onSearchCancel(token))
  },
  onSearchData: (keyWord, token,storeName, pageSize, favoriteDao) => {
    // console.log(labelType,url,pageSize)
    dispacth(actions.onSearchData(keyWord, token,storeName, pageSize, favoriteDao))
  }
})

export default connect(mapSearchStateToProps, mapSearchDipacthToProps)(SearchPage)


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
  },
  searchText:{
    color:'#fff',
    paddingHorizontal:10 
  },
  inputBox:{
    backgroundColor:'rgba(0,0,0,.1)',
    borderWidth:.5,
    borderColor:'rgba(0,0,0,.2)',
    borderRadius:2,
    height:30,
    lineHeight:30,
    // flex:1,
    width:'100%',
    fontSize:12, 
    padding:0,
    paddingHorizontal:4,
    color:'#fff' 
  },
  btnBox:{
    position:'absolute',
    left:0,
    bottom:0,
    padding:10,
    width:'100%'
  },
  btn:{
    width:'100%',
    height:40,
    lineHeight:40,
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    backgroundColor:'red' ,
    borderRadius:4,
  }
});
