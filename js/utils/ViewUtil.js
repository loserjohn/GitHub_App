
import { StyleSheet, Text, View, TouchableOpacity,WebView  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
export default class ViewUtil {
    static getLeftBackButton(callback){
        return <TouchableOpacity
            style={{padding:8,paddingLeft:12}}
            onPress = {callback}
        >
            <Ionicons
                name = {'ios-arrow-back'}
                size={26}
                style={{color:'#fff'}}
            ></Ionicons>
        </TouchableOpacity>
    }

    static getShareButton(callback){
        return <TouchableOpacity
       underlayColor={'transparent'} 
        onPress = {callback}
    >
        <Ionicons
            name = {'md-share'}
            size={20}
            style={{color:'#fff',opacity:0.9,marginRight:10}}
        ></Ionicons>
    </TouchableOpacity>
    }
}