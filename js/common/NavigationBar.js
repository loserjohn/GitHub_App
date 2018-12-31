

import React, {Component} from 'react';
import {ViewPropTypes,Text,StyleSheet,View,Platform,StatusBar,DeviceInfo} from 'react-native';
import PropsTypes from  'prop-types';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;


const StatusBarShape = {
    barStyle:PropsTypes.oneOf(['light-content','default']),
    hidden:PropsTypes.bool,
    backgroundColor:PropsTypes.string
}
export default class NavigationBar extends Component{

    static propTypes = {
        style:PropsTypes.object, 
        title:PropsTypes.string,
        titleView:PropsTypes.element,
        titleLayoutStyle:PropsTypes.object,
        hide:PropsTypes.bool,
        statusBar:PropsTypes.shape(StatusBarShape),
        rightButton:PropsTypes.element,
        leftButton:PropsTypes.element

    }

    static defaultProps = {
        statucBar:{
            batStyle:'light-content',
            hidden:false
        }
    }

    render(){
        let  statusBar = !this.props.statusBar.hidden? 
        <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar}></StatusBar>
        </View>:null

        let titleView = this.props.titleView?this.props.titleView:
        <Text ellipsizeMode = 'head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>

        let content = this.props.hide?null:
        <View style={styles.navBar}>
            {this.getButtonElement(this.props.leftButton)}
            <View style={[styles.navBarTitleContainer,this.props.titleLayout]}>
                {titleView}
            </View>
            {this.getButtonElement(this.props.rightButton)}
        </View>;

        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
    getButtonElement(data){
        return(
            <View style={styles.navBarButton}>
                {data?data:null}
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#2196f3'
    },
    navBarButton:{
        alignItems:'center'
    },
    navBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:Platform.OS =='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID

    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:'#fff'
    },
    statusBar:{
        height:Platform.OS =='ios'?STATUS_BAR_HEIGHT:0
    }
})