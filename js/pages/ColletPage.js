/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
// import Navigation from '../Navigation';
import actions from '../actions/index'
import { connect } from 'react-redux';

class ColletPage extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Button 
        title="黄色"
        onPress = {()=>{      
         this.props.onThemeChange('#fd7616')
            //  alert(1)
        }} ></Button>
      </View> 
    );
  }
}
const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(mapStateToProps,mapDispatchToProps)(ColletPage)
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
