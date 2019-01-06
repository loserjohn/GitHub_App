/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default  class Test extends Component {

    constructor(props){
        super(props)
        this.state = {
            // stateText:'我是内部的值'
            stateText:this.props.data.text,  
           data:this.props.data
        } 
    }
      // 新版本的生命周期
    static getDerivedStateFromProps(nextProps,prevState){
        console.log(nextProps,prevState)  
        if(nextProps.data.text !== prevState.data.text){
            alert('666')
            return ({
                data:nextProps.data  
            })
        } 
        return null
    }
    handler(){
        alert(1);
        this.setState({ 
            stateText:'修改'+new Date().getTime()  
        })
    }
    render(){
        return(
            <View>
                <Text>{this.props.data.text}</Text>
                <Text>{this.state.stateText}</Text>
                <Text onPress={()=>{this.handler()}}>{this.state.data.text}</Text>
            </View>
        )
    }
}

