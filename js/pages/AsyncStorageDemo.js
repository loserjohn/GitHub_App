/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View,Button,AsyncStorage} from 'react-native';
// import Navigation from '../Navigation';
import actions from '../actions/index'
import { connect } from 'react-redux';

class AsyncStorageDemo extends Component {
  constructor(props){
    super(props)
    this.state = {
      keywod:'',
      res :''
    }
  }
//   _setdata =async ()=>{
//     try {
//         await AsyncStorage.setItem('demoKey', this.state.keywod)

//       } catch (error) {
//         // Error saving data
//         alert(error.toString())
//       }
//   }
//   _getdata=async ()=>{
//     try {
//         let value = await AsyncStorage.getItem('demoKey')
//         this.setState({
//             res:value
//         })
//       } catch (error) {
//         alert(error.toString())
//       }
//     }

//     _detdata=async ()=>{
//         try {
//             await AsyncStorage.removeItem('demoKey')
                   
//           } catch (error) {
//             alert(error.toString()) 
//           }
//         }

        _setdata(){
           AsyncStorage.setItem('demoKey', this.state.keywod).then((res)=>{

           }).catch(error=>{
                // Error saving data
                alert(error.toString())
           })
        
           
            
         
          }
          _getdata(){
            AsyncStorage.getItem('demoKey').then((value)=>{
                this.setState({
                    res:value
                }) 
            }).catch(error=>{
                 // Error saving data
                 alert(error.toString())
            })
        }
            _detdata(){
                AsyncStorage.removeItem('demoKey').then((res)=>{ }).catch(error=>{
                     // Error saving data
                     alert(error.toString())
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
         this._setdata()
        }} title="存數據"></Button>
        <Button onPress = {()=>{
         this._getdata()
        }} title="取數據"></Button>
        <Button onPress = {()=>{
         this._detdata()
        }} title="刪除數據"></Button>
     
        <Text>
           {this.state.res?this.state.res:'没有数据'}
        </Text>
      </View> 
    );
  }
}
const mapStateToProps = state =>({})
const mapDispatchToProps = dispatch =>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
  export default connect(mapStateToProps,mapDispatchToProps)(AsyncStorageDemo)
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
