/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import actions from '../actions/index'
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';

import { MORE_MENUS } from '../common/MoreMenus'
import ViewUtil from '../utils/ViewUtil'
import {LANGUAGE_FLAG} from '../utils/expand/LanguageDao'
import ThemeDialog from '../common/ThemeDialog'   
// import ThemeDao from '../utils/expand/ThemeDao'  
// import Test from '../common/Test'


// const themeDao = new ThemeDao()
import NavigationUtil from '../utils/NavigationUtil'

// const THEME_COLOR = "#3697ff"  
class MinePage extends Component {
  constructor(props) {

    super(props)

    this.state = {
      test: '我是初始值'
    }
    // console.log(MORE_MENUS) 
  }
  onClick(item) {
    let RouteName, params = {}
    const {theme} = this.props  
    // debugger   
    switch (item) {
      case MORE_MENUS.Tutorial:
        NavigationUtil.navigateTo({theme:theme}, 'WebPage')
        break;
      case MORE_MENUS.About_Auther:
        NavigationUtil.navigateTo({theme:theme}, 'AboutAuthor') 
        break;
      case MORE_MENUS.About:
        NavigationUtil.navigateTo({theme:theme}, 'AboutPage')  
        break;
      case MORE_MENUS.Custom_Key:
        NavigationUtil.navigateTo({theme:theme,flag:LANGUAGE_FLAG.keys,isDelect:false}, 'CustomKey') 
        break;
      case MORE_MENUS.Custom_Language:
        NavigationUtil.navigateTo({theme:theme,flag:LANGUAGE_FLAG.languages,isDelect:false}, 'CustomKey') 
        break;
        // 移除标签
      case MORE_MENUS.Remove_Key:
        NavigationUtil.navigateTo({theme:theme,flag:LANGUAGE_FLAG.keys,isDelect:true}, 'CustomKey') 
        break;
        // 排序标签
      case MORE_MENUS.Sort_Key: 
        NavigationUtil.navigateTo({theme:theme,flag:LANGUAGE_FLAG.keys}, 'SortKey') 
        break;
      // 语言标签
      case MORE_MENUS.Sort_Language:
         NavigationUtil.navigateTo({theme:theme,flag:LANGUAGE_FLAG.languages}, 'SortKey') 
         break;
      // 自定义主题
      case MORE_MENUS.Custom_Theme:
         this.refs.thememodel.dismiss(true)  
         break;
      default:
        break;
    }

  }
  renderPanel(item) {
    const {theme} = this.props
    return ViewUtil.getMenuItem(() => { this.onClick(item) }, item, theme, false)
    // return  <Text>VDGDFGGFDS</Text> 
  }
  render() {
    const {theme} = this.props
    console.log('theme',theme)
    let statusBar = {
      backgroundColor: theme, 
      barStyle: 'light-content'
    };
    let navigationBar = <NavigationBar
      title={'我的'}
      statusBar={statusBar}
      style={
        { backgroundColor: theme, } 
      }
    // rightButton={this.getRightButton()}
    // leftButton={this.getLeftButton()}
    />

    return (
      <View style={styles.container}>
        {navigationBar}
        <ThemeDialog ref="thememodel"></ThemeDialog>    
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              NavigationUtil.navigateTo({theme:theme}, 'AboutPage')
            }}
          >
            <View style={styles.row}>
              <Anticons
                name={'github'}
                size={40}
                style={{ color: '#404040' }}
              ></Anticons>
              <Text style={{ textAlign: 'left', flex: 1, paddingLeft: 15 }}>GitHub</Text>
              <Feather
                name={'chevron-right'}
                size={16} 
                style={{ color: theme?theme:'#d3d3d3' }}
              ></Feather>
            </View>

            {/* <View style={styles.line}></View> */}
          </TouchableOpacity>
          {this.renderPanel(MORE_MENUS.Tutorial)}
          
          <Text style={{ lineHeight: 40,paddingLeft:16 }}>最热管理</Text>
          {this.renderPanel(MORE_MENUS.Custom_Key)}
          {this.renderPanel(MORE_MENUS.Sort_Key)}
          {this.renderPanel(MORE_MENUS.Remove_Key)} 

          <Text style={{ lineHeight: 40 ,paddingLeft:16}}>趋势管理</Text>
          {this.renderPanel(MORE_MENUS.Custom_Language)}
          {this.renderPanel(MORE_MENUS.Sort_Language)} 

          <Text style={{ lineHeight: 40 ,paddingLeft:16}}> 设置</Text>
          {this.renderPanel(MORE_MENUS.Custom_Theme)}
          {this.renderPanel(MORE_MENUS.About_Auther)}
          {this.renderPanel(MORE_MENUS.About)}
          {/* {this.renderPanel(MORE_MENUS.Sort_Language)} */}
        </ScrollView>
       
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme:state.theme.theme
})
// const mapDispatchToProps = dispatch => ({
//   onThemeChange: theme => dispatch(actions.onThemeChange(theme))
// })
export default connect(mapStateToProps)(MinePage)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 0
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee'
  },
});
