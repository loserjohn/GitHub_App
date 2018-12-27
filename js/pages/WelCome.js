
/**
 *
 *
 * @export
 * @class WelCome
 * @extends {Component}
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import NavigationUtil from '../utils/NavigationUtil'


export default class WelCome extends Component {
  constructor(props){
    super(props) 
  }
  componentDidMount(){
    // alert(1)
    // console.log(0)
    this.t = setTimeout(()=>{
      // this.props.navigation.navigate('Main');
      NavigationUtil.resetToHome(this.props.navigation)
    },2000)
  }
 
  componentWillUnmount(){
    this.t && clearTimeout(this.t)
  }

  render() {
    // const {routes,index} = this.props.navigation.state;  
    // console.log('第一层路由',this.props.navigation)   
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
      </View> 
    );
  }
}

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
