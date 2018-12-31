/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
// import Navigation from '../Navigation';
import actions from '../actions/index'
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME_COLOR = "#3697ff" 
class MinePage extends Component {
  getRightButton(){
    return(
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress = {()=>{

            }}
          >
              <View style={{padding:5,marginRight:8}}>
              <Feather
                name = {'search'}
                size={24}
                style={{color:'#fff'}}
              ></Feather>
              </View>
          </TouchableOpacity>
        </View>
    )
}
getLeftButton(callback){
  return(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          onPress = {callback}
          style={{
            padding:8,paddingLeft:12
          }}
        >
           <Ionicons
              name = {'ios-arrow-back'}
              size={24}
              style={{color:'#fff'}}
           ></Ionicons>
        </TouchableOpacity>
      </View>
  )
}

  render() {
    let statusBar = {
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    };
    let navigationBar = <NavigationBar 
      title={'我的'}
      statusBar = {statusBar}
      style={
        { backgroundColor:THEME_COLOR,} 
      }
      rightButton = {this.getRightButton()}
      leftButton = {this.getLeftButton()}
      />

    return (
      <View style={styles.container}>
          {navigationBar}
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
         <Button onPress = {()=>{
         this.props.onThemeChange('#fd16a1')
            //  alert(1)
        }} title="红色"></Button>
      </View> 
    );
  }
}
const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
  export default connect(mapStateToProps,mapDispatchToProps)(MinePage)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF', 
    marginTop:0
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
