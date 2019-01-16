import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking
} from 'react-native';
import AboutBase from "../common/AboutBase";
import { MORE_MENUS } from '../common/MoreMenus'
import ViewUtil from '../utils/ViewUtil'
import config from '../utils/set'

import NavigationUtil from '../utils/NavigationUtil'
const width = Dimensions.get("window").width;
export const FLAG_ABOUT = { flag_about: 'about', flag_about_me: 'about_me' }
// const THEME_COLOR = "#3697ff"

export default class AboutPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: config
        }
        this.params = this.props.navigation.state.params;
        this.theme = this.props.navigation.state.params.theme
        this.aboutCommon = new AboutBase({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about,
        }, data => this.setState(...data));
    }
    componentWillMount() {
       
        // console.log(  this.props ) 
        // console.log(Obejct.keys(r))


    }
    onClick(item) {
        let RouteName, params = {}
    
        switch (item) {
            case MORE_MENUS.Tutorial:
                NavigationUtil.navigateTo({theme:this.theme }, 'WebPage')
                break;
            case MORE_MENUS.About_Auther:
                NavigationUtil.navigateTo({theme:this.theme }, 'AboutAuthor')
                break;
            case MORE_MENUS.About:
                NavigationUtil.navigateTo({theme:this.theme }, 'AboutPage')
                break;
            case MORE_MENUS.Feedback:
                const url = 'mailto://1292404844@qq.com'
                Linking.canOpenURL(url)
                    .then(support => {
                        if (!support) {
                            console.log('无法处理')
                        } else {
                            Linking.openURL(url)
                        }
                    }).catch(e => {
                        console.error('error:' + e)
                    })
                break;
            default:
                break;
        }

    }
    renderPanel(item, mark) {
        const color = this.theme 
        return ViewUtil.getMenuItem(() => { this.onClick(item) }, item, color, false)
    }

    renderContentView() {

        return (
            <View >
                {this.renderPanel(MORE_MENUS.Tutorial)}
                {this.renderPanel(MORE_MENUS.About_Auther)}
                {this.renderPanel(MORE_MENUS.Feedback)}
            </View>
        )
    }

    render() {
        const content = this.renderContentView()
        return this.aboutCommon.renderView(
            content, this.state.data.app)
        // return <Text>sadfsdaf</Text>
    }

}
