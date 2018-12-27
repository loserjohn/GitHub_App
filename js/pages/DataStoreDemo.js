/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,Button} from 'react-native';
// import Navigation from '../Navigation';
import actions from '../actions/index'
import { connect } from 'react-redux';
import DataStore from '../utils/DataStore'

class FetchDemo extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywod:'php',
      res :''
    }
    // console.log(DataStore.fetchData) 
    this.dataStore = new DataStore()
  }
  _getdata= ()=>{
      let url = `https://api.github.com/search/repositories?q=${this.state.keywod}`;
      this.dataStore.fetchData(url).then(res=>{
        this.setState({res: JSON.stringify(res) }) 
      }).catch(err=>{
          console.log( err.toString())
      })
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
       style={styles.input}
       onChangeText={(text) => this.setState({keywod:text})}
       value={this.state.keywod}></TextInput>
         <Button onPress = {()=>{
         this._getdata()
        }} title="获取数据"></Button>
        <Text>
           {this.state.res}
        </Text>
      </View> 
    );
  }
}
const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
  export default connect(mapStateToProps,mapDispatchToProps)(FetchDemo)
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
  input:{
    height: 40, borderColor: 'gray', borderWidth: 1,
    width:'100%'
  }
});
