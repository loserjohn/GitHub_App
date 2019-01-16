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

 
class Detail extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    // debugger
    const projectModel = this.params.projectModel.item;
    this.projectModel = this.params.projectModel.item;
    this.url = projectModel.html_url || baseURL + projectModel.fullName
    const tittle = projectModel.full_name || projectModel.fullName
    this.favoriteDao = this.params.favoriteDao
    this.flag = this.params.flag
    this.callback = this.params.callback
    this.state = {
      title: tittle,
      url: this.url,
      canGoBack: false,
      isFavorite: this.params.projectModel.isFavorite
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
  doFavorite(isFavorite) {
    // this.props.projectModel.isFavorite = isFavorite;   
    this.setState({
      isFavorite: isFavorite
    })
    this.callback(isFavorite)
    FavoriteUtils.onFavorite(this.favoriteDao, this.projectModel, isFavorite, this.flag)
  }

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
    //  console.log(navState) 
    let canBack = navState.canGoBack
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  back() {
    // console.log('detail里面的回调')
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.backTo(this.props.navigation)
    }
  }

  render() {
    const {theme } = this.props.navigation.state.params
    let statusBar = {
      backgroundColor: theme,
      barStyle: 'light-content'
    }
    // console.log(this.state.source)
    return (
      <View style={styles.container}>
        <NavigationBar
          // title={'趋势'}
          title={this.state.title}
          leftButton={ViewUtil.getLeftBackButton(() => { this.back() })}
          rightButton={this.renderRightButton()}
          statusBar={statusBar}
          style={{
            backgroundColor: theme
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
const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(Detail)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', 
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
