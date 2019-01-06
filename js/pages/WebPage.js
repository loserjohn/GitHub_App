/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, WebView } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewUtil from '../utils/ViewUtil'
import NavigationUtil from '../utils/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'
import { FLAG_STORE } from '../utils/DataStore'
import FavoriteUtils from '../utils/FavoriteUtils'
// const favoriteDao = new FavoriteDao(FLAG_STORE.flag_popular)

const baseURL = "https://github.com/"

const THEME_COLOR = "#3697ff"



class WebPage extends Component {
  constructor(props) {
    super(props);

    // debugger

    this.url = 'https://m.imooc.com/'
    const tittle = '教程'



    this.state = {
      title: tittle,
      url: this.url,
      canGoBack: false
    }
    // this.backPressComponent = new BackPressComponent({backPress:()=>{this.onBackPress()}})
    this.backPressComponent = new BackPressComponent({ backPress: this.onBackPress })
  }
  componentDidMount() {
    this.backPressComponent.componentDidMount()
  }

  componentWillUnmount() {
    this.backPressComponent.componentWillUnmount()
  }
  onBackPress = () => {

    this.back()
    return true
  };


  renderRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
          this.doFavorite(!this.state.isFavorite)
        }}
        underlayColor="transparent"
      >
        <FontAwesome
          // name={'star-o'}
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={20}
          style={{ color: 'white', marginRight: 10 }}
        >

        </FontAwesome>
      </TouchableOpacity>
      {
        ViewUtil.getShareButton(() => {
        })
      }

    </View>
  }
  onNavigationStateChange(navState) {
    let canBack = navState.canGoBack
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  back() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.backTo(this.props.navigation)
    }
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    return (
      <View style={styles.container}>
        <NavigationBar
          // title={'趋势'}
          title={this.state.title}
          leftButton={ViewUtil.getLeftBackButton(() => { this.back() })}
          statusBar={statusBar}
          style={{
            backgroundColor: THEME_COLOR
          }}
        />

        <WebView
          style={styles.container}
          ref={webView => this.webView = webView}
          source={{ uri: this.state.url }}
          //  renderLoading={true}
          startInLoadingState={true}
          onNavigationStateChange={(event) => { this.onNavigationStateChange(event) }}
        ></WebView>
      </View>
    );
  }
}


export default WebPage


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', 
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
