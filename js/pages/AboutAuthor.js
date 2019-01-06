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
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../utils/NavigationUtil'
const width = Dimensions.get("window").width;
export const FLAG_ABOUT = {flag_about:'about',flag_about_me:'about_me'}
const THEME_COLOR = "#3697ff"

export default class AboutAuthor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data:config,
            showTutorial:true,
            showBlog:false,
            showQQ:false,
            showContact:false,
        }
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutBase({
            ...this.params,
            navigation:this.props.navigation,
            flagAbout:FLAG_ABOUT.flag_about_me,
        }, data => this.setState(...data));
        // this.state = {
        //     data:config
        // }
    }
    componentWillMount() {  
    
        console.log(this.state.data)
        // console.log(Obejct.keys(r))

       
    }
    onClick(item) {
        let RouteName, params = {}
        switch (item) {
          case MORE_MENUS.Tutorial:
            NavigationUtil.navigateTo({}, 'WebPage')
            break;
          case MORE_MENUS.About:
            NavigationUtil.navigateTo({}, 'AboutPage') 
            break;
        case MORE_MENUS.Feedback:
            const url = 'mailto://1292404844@qq.com'
            Linking.canOpenURL(url)
            .then(support=>{
                if(!support){
                    console.log('无法处理')
                }else{
                    Linking.openURL(url)
                }
            }).catch(e=>{
                console.error('error:'+e)
            })
            break;
          default:
            break;
        }
    
      }
    renderPanel(item,mark) {
        const color = THEME_COLOR
        return ViewUtil.getMenuItem(() => { this.onClick(item) }, item, color, false)
    }

    renderContentView() {

        return (
            <View >
                 {this._item(this.state.data.aboutMe.Tutorial,this.state.showTutorial,'showTutorial')}
                 {this._item(this.state.data.aboutMe.Blog,this.state.showBlog,'showBlog')}               
                 {this._item(this.state.data.aboutMe.Contact,this.state.showContact,'showContact')}
                 {this._item(this.state.data.aboutMe.QQ,this.state.showQQ,'showQQ')} 
            </View>
        )
    }
    _item(menu,isShow,key){
        return ViewUtil.getSettingItem(()=>{
            this.setState({
                [key]:!this.state[key]
            })
        },menu.name,THEME_COLOR,Ionicons,menu.icon,isShow?'chevron-down':'chevron-up')
    }
    render() {
        const content = this.renderContentView()
        return this.aboutCommon.renderView(
           content ,this.state.data.author)  
        // return <Text>sadfsdaf</Text>
    }

}
