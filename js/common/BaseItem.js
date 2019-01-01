/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropsTypes from  'prop-types';

export default  class BaseItem extends Component {

    static propTypes = {
        projectModel:PropsTypes.object, 
        onselect:PropsTypes.func,
        onFavorite:PropsTypes.func,
    }
    constructor(props){
        super(props)
        this.state = {
            isFavorite: this.props.projectModel.isFavorite
        }
    }
    // 新版本的生命周期
    static getDerivedStateFromProps(nextProps,prevState){
        const isFavorite = nextProps.projectModel.isFavorite;
        if(prevState.isFavorite !== isFavorite){
            return {
                isFavorite: isFavorite
            }
        }
        return null
    }
    // 改变状态
    setFavoriteState(){
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite:isFavorite
        })
    }

    // 图标的点击事件
    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite)
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite) //回调到父组件
    }
    // 生成收藏按钮图标
    _favoriteicon(){
        return <TouchableOpacity
            style={{padding: 6}}
            underlayColor = 'transparent'
            onPress = {()=> this.onPressFavorite()}
        >
            <FontAwesome
                name = {this.state.isFavorite ? 'star':'star-o'}
                size={20}
                style ={{color:'#678'}}
            ></FontAwesome>
        </TouchableOpacity>

    }

}

