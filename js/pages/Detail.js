/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity,WebView  } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const baseURL = "https://github.com/"

const THEME_COLOR = "#3697ff"
class Detail extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params.itemData.fullName)
    this.state={
      title: this.props.navigation.state.params.itemData.fullName,
      source: baseURL + this.props.navigation.state.params.itemData.fullName
    }
  }
 
  renderRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {  }}
        underlayColor="transparent"
      >
        <MaterialIcons
          name={'arrow-drop-up'}
          size={22}
          style={{ color: 'white' }}
        ></MaterialIcons>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {  }}
        underlayColor="transparent"
      >
        <MaterialIcons
          name={'arrow-drop-up'}
          size={22}
          style={{ color: 'white' }}
        ></MaterialIcons>
      </TouchableOpacity>
    </View>
  }
  render() { 
    let statusBar = {
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }
    console.log(this.state.source)
    return (
      <View style={styles.container}>
        <NavigationBar
          // title={'趋势'}
          title={this.state.title}
  
          rightButton={this.renderRightButton()}
          statusBar={statusBar}
          style={{
            backgroundColor: THEME_COLOR
          }}
        />

      <WebView 
        style={styles.container}
         source={{uri: this.state.source}} 
        //  renderLoading={true}
         startInLoadingState = {true} 
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
