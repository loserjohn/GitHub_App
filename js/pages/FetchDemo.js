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

class FetchDemo extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywod:'',
      res :''
    }
  }
  _getdata(){
      let url = `https://api.github.com/search/repositories?q=${this.state.keywod}`;
      fetch(url)
      .then(res=>{
        console.log(res)
          if(res.ok ){
            return res.text()
          }
          // throw new Error('netWork fail')
      })
      .then(res=>{
        
        this.setState({res:res})
      }).catch(e=>{
        this.setState({res:e.toString()})
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
