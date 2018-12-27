/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil'


import actions from '../actions/index'
import { connect } from 'react-redux';

class TrendPage extends Component {
  test(){
    // alert(1);global.tintColor = "#ff0000"
  }
  render() {
    return (
      
      <View style={styles.container}>
        {/* <Text style={styles.welcome}  onPress = {()=>{
         this.props.onThemeChange('#096')
             alert(1)
        }}>Trend</Text>  */}
        <Button onPress = {()=>{
         this.props.onThemeChange('#096')
            //  alert(1)
        }} title="改变主题"></Button>

        <Button onPress = {()=>{
         NavigationUtil.navigateTo(this.props,'FetchDemo')
            //  alert(1)
        }} title="fetch"></Button>
         <Button onPress = {()=>{
         NavigationUtil.navigateTo(this.props,'AsyncStorageDemo')
            //  alert(1)
        }} title="AsyncStorage"></Button>
        <Button onPress = {()=>{
         NavigationUtil.navigateTo(this.props,'DataStoreDemo')
            //  alert(1)
        }} title="本地缓存测试"></Button>
      </View> 
    );
  }
}

const mapStateToProps = state =>({
  
})
const mapDispatchToProps = dispatch =>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(TrendPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
