import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Clipboard,
    View,
    Dimensions,
    Linking,

} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import AboutBase from "../common/AboutBase";
import { MORE_MENUS } from '../common/MoreMenus'
import ViewUtil from '../utils/ViewUtil'
import config from '../utils/set'
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../utils/NavigationUtil'
const width = Dimensions.get("window").width;
export const FLAG_ABOUT = { flag_about: 'about', flag_about_me: 'about_me' }
// const THEME_COLOR = "#3697ff" 

export default class AboutAuthor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: config,
            showTutorial: true,
            showBlog: false,
            showQQ: false,
            showContact: false,
        }
        this.params = this.props.navigation.state.params;
        this.theme = this.props.navigation.state.params.theme
        
        this.aboutCommon = new AboutBase({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about_me,
        }, data => this.setState(...data));
        // this.state = {
        //     data:config
        // }
    }
    componentWillMount() {
        // console.log(  this.props )
        // console.log(this.state.data)
        // console.log(Obejct.keys(r))

    }
    // 父选项选择回调
    // onClick(item){
    //     let RouteName, params = {}
    //     switch (item) {
    //         case MORE_MENUS.Tutorial:
    //             NavigationUtil.navigateTo({}, 'WebPage')
    //             break;
    //         case MORE_MENUS.About:
    //             NavigationUtil.navigateTo({}, 'AboutPage')
    //             break;
    //         case MORE_MENUS.Feedback:
    //             const url = 'mailto://1292404844@qq.com'
    //             Linking.canOpenURL(url)
    //                 .then(support => {
    //                     if (!support) {
    //                         console.log('无法处理')
    //                     } else {
    //                         Linking.openURL(url)
    //                     }
    //                 }).catch(e => {
    //                     console.error('error:' + e)
    //                 })
    //             break;
    //         default:
    //             break;
    //     }

    // }
    // 子选项选择回调
    onHandler(sub){
        // let type = ;
        if(sub.url){
            // 链接操作
            NavigationUtil.navigateTo({url:sub.url,theme:this.theme}, 'WebPage')
        }else{
            // 账号复制操作  
            // alert(1)
            sub.account && Clipboard.setString(sub.account)   
            this.refs.toast.show('复制成功'+sub.account); 
        }
    }
    // 渲染选项
    renderPanel(item, mark) {
        const color = this.theme
        return ViewUtil.getMenuItem(() => { this.onClick(item) }, item, color, false)
    }
    subItems(item, mark) {
        let data = item.items;
        data = typeof (data) === 'Array' ? data : Object.values(data)
        let subs = data.map((it, idx) => {
            let title = it.account? it.title + ':' + it.account:it.title
    
            return <View key={`sub${mark + idx}`}>
                {
                    ViewUtil.getSettingItem(() => {
                        this.onHandler(it)
                    },title , this.theme)
                }
            </View>

        })

        return this.state[mark] ? <View>
            {subs}
        </View> : null
    }

    renderContentView() {

        return (
            <View >
                {this._item(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
                {this.subItems(this.state.data.aboutMe.Tutorial, 'showTutorial')}
                {this._item(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
                {this.subItems(this.state.data.aboutMe.Blog, 'showBlog')}
                {this._item(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
                {this.subItems(this.state.data.aboutMe.Contact, 'showContact')}
                {this._item(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
                {this.subItems(this.state.data.aboutMe.QQ, 'showQQ')}
                <Toast
                    ref="toast"
                    position='center'
                    opacity={0.8}    
                    />
            </View>
        )
    }
    _item(menu, isShow, key) {
        return ViewUtil.getSettingItem(() => {
            this.setState({
                [key]: !this.state[key]
            })
        }, menu.name, this.theme, Ionicons, menu.icon, isShow ? 'chevron-up' : 'chevron-down')
    }
    render() {
        const content = this.renderContentView()
        return this.aboutCommon.renderView(
            content, this.state.data.author)
        // return <Text>sadfsdaf</Text>
    }

}
