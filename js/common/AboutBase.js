
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableHighlight
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtil from '../utils/ViewUtil'
import NavigationUtil from '../utils/NavigationUtil'
// import BackPressComponent from '../common/BackPressComponent'
// import config from '../utils/set'
import GlobalStyles from '../res/styles/GlobalStyles'


const window = Dimensions.get('window');
// const THEME_COLOR = "#3697ff"
const AVATAR_SIZE = 90;
const ROW_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + 20 : GlobalStyles.nav_bar_height_android;;
const PARALLAX_HEADER_HEIGHT = 220; 
// alert(Platform.OS )  
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + 20 : GlobalStyles.nav_bar_height_android;
const SCREEN_WIDTH = window.width;

// export const FLAG_ABOUT = {flag_about:'about',flag_about_me:'about_me'}

/**
 *组装者结构
 * @export
 * @class AboutBase
 */
export default class AboutBase {
    constructor(params, updateState) {
        this.state = {
            canGoBack: false
        }
        this.updateState = updateState;
        this.navigation = params.navigation
        this.theme = params.navigation.state.params.theme
        // this.backPressComponent = new BackPressComponent({ backPress: this.onBackPress })

    }
    componentDidMount() {
        // this.backPressComponent.componentDidMount()
        const url = 'http://www.devio.org/io/GitHubPopular/json/github_app_config.json'
        fetch(url).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('Net work error')
        }).then((config) => {
            // 获取参数然后通过，回调传给使用者
            if (config) {
                this.updateState({ data: config })
            }
        })
            .catch(err => { 

            })
    }

    // componentWillUnmount() {
    //     this.backPressComponent.componentWillUnmount()
    // }
    // onBackPress = () => {
    //     // console.log(666,this.props.navigation)
    //     NavigationUtil.backTo(this.props.navigation)
    //     return true
    // };


    /**
     *
     * 设置参数
     * @param {*} params
     * @title string
     * @bg_url string
     * @author_img string
     * @info string
     * @returns 
     * @memberof AboutBase
     */
    renderParallaxScrollView(params) {
        let config = {};
        let avatar =  typeof(params.avatar) === 'string' ? {uri:params.avatar}:params.avatar

        // 视察区域背景图片
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundImg,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }} />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }} />
            </View>
        );
        // 视差区域前景组件        
        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image  source={avatar} 
                style={{width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE / 2   
                }}
                />
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        );
        // 下拉后显示的头部组件
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>  
            </View>
        );
        // 顶部透明固定组件
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftBackButton(() => { this.back() })}
                {ViewUtil.getShareButton(() => { this.back() })}
            </View>
        );
        return config;
    }
    // 返回
    back() {
        NavigationUtil.backTo(this.navigation)
    }
    /**
     *
     * @param contentView
     * @param params
     * @returns {XML}
     * 暴露出去的渲染函数
     */
    renderView(contentView, params) {
        this.RenderConfig = this.renderParallaxScrollView(params);
        return (
            <ParallaxScrollView
                headerBackgroundColor={ this.theme}
                backgroundColor={ this.theme}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...this.RenderConfig}>
                {contentView}
            </ParallaxScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        flexDirection: 'row',
        alignItems: "center",
        height: STICKY_HEADER_HEIGHT,
        width: SCREEN_WIDTH,
        // backgroundColor: "#3697ff",
        justifyContent: 'space-around'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        width: SCREEN_WIDTH,
        position: 'absolute',
        height: STICKY_HEADER_HEIGHT,
        // borderWidth: 1,
        // borderColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal:40
    },
    // row: {
    //     overflow: 'hidden',
    //     paddingHorizontal: 10,
    //     height: ROW_HEIGHT,
    //     backgroundColor: 'white',
    //     borderColor: '#ccc',
    //     borderBottomWidth: 1,
    //     justifyContent: 'center'
    // }, 
    rowText: {
        fontSize: 20
    },
    left: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
});
