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
            stateText:this.props.text
        } 
    }
    
    render(){
        return(
            <View>
                <Text>{this.props.text}</Text>
                <Text>{this.state.stateText}</Text>
            </View>
        )
    }
}

