/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { connect } from 'react-redux';

class Detail extends Component {

  
  render() {
    console.log(this.props.store)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Detail</Text>
      </View> 
    );
  }
}
const mapStateToProps = state =>({
  nav:state.nav
})

export default connect(mapStateToProps)(Detail)


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
