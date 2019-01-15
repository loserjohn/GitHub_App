/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity ,Alert} from 'react-native';

import actions from '../actions/index'
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box'
import BackPressComponent from '../common/BackPressComponent'
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';


import { MORE_MENUS } from '../common/MoreMenus'
import ViewUtil from '../utils/ViewUtil'

import { LANGUAGE_FLAG } from '../utils/expand/LanguageDao'
import LanguageDao from '../utils/expand/LanguageDao'

// import Test from '../common/Test'



import NavigationUtil from '../utils/NavigationUtil'

const THEME_COLOR = "#3697ff"
class CustomKey extends Component {

    constructor(props) {
        super(props);
        const { flag, isDelect } = this.props.navigation.state.params
        // alert(flag) 
        this.flag = flag
        let title = flag == LANGUAGE_FLAG.keys ? '自定义标签' : '自定义语言'
        title = isDelect ? '移除标签' : title
        this.isDelect = isDelect

        this.checkValue = [] //存放修改记录的


        this.state = {
            keys: [],
            title: title
        }
        // this.backPressComponent = new BackPressComponent({backPress:()=>{this.onBackPress()}})
        this.backPressComponent = new BackPressComponent({ backPress: this.onBackPress })
    }
    componentDidMount() {
        const { langs } = this.props
        this.backPressComponent.componentDidMount();
        const languageDao = new LanguageDao(this.flag)
        // console.log(0,langs)
            // 标签配置页面
            if (!langs[this.flag]) {              
                languageDao.fetch().then((res) => {
                    // 获取所有选中的语言
                    if (this.flag == LANGUAGE_FLAG.keys && this.isDelect) {
                        // alert(1)
                        // 这是标签移除页面  一定是最热管理的
                        this.setState({
                            // 只显示checked==true的项
                            keys: this.getAllChecked(res) 
                        })
                    }else{
                        this.setState({
                            keys: res
                        })
                    }  
                   
                })
            } else {
                if (this.flag == LANGUAGE_FLAG.keys && this.isDelect) {
                    // 这是标签移除页面  一定是最热管理的
                    this.setState({
                        keys:  this.getAllChecked(langs[this.flag]) 
                    })
                }else{
                    this.setState({
                        keys: langs[this.flag]
                    })
                }  
                
            }
       
    }

    componentWillUnmount() {
        this.backPressComponent.componentWillUnmount()
    }

    // 移除页面获取的是所有已经选择的
    getAllChecked(keys){
        let res = []
        
        keys.map((item,index)=>{
            if(item.checked ){
                res.push(item)
            }
        })

        return res
    }

    // 返回键处理
    onBackPress = () => {
        this.back()
        return true
    }
    // 返回函数
    back() {
        // 检查是否有历史操作记录
        const checkValueArr =  this.checkValue;
        if(!checkValueArr.length){
            // 没有历史项则直接返回
            NavigationUtil.backTo(this.props.navigation)
        }else{
            // 有记录则需要刷新 页面 保存数据在返回
            Alert.alert(
                '小贴士提醒您',
                '是否要保存修改？',
                [
                  {text: '取消', onPress: () => {
                    NavigationUtil.backTo(this.props.navigation) 
                  }, style: 'cancel'},
                  {text: '保存', onPress: () =>{
                     this.save()
                  }},
                ],
                { cancelable: false }
              )
        }

    }
    // 保存结果
    save=()=>{ 
        const checkValueArr =  this.checkValue;
        if(!checkValueArr.length)return ;
        let onRreshLanguage = this.props.onRreshLanguage
        const { keys } = this.state;
        const languageDao = new LanguageDao(this.flag)   
        // console.log(keys )   
        
       
        // debugger 
        if (this.flag == LANGUAGE_FLAG.keys && this.isDelect) {
            const langs = this.props.langs
            // if(!langs)return;
            let defalutKey = langs[this.flag]
            // console.log(111,langs) 
            // debugger   
            // 移除标签则做特殊处理
            checkValueArr.map((item,index)=>{
                let k = defalutKey.indexOf(item)   ;
                defalutKey[k] = item
            })
            // console.log(defalutKey)
            languageDao.save(defalutKey) ;
            onRreshLanguage(this.flag);
            NavigationUtil.backTo(this.props.navigation) 
        }else{
            // 配置标签则直接保存
            languageDao.save(keys) ;
            onRreshLanguage(this.flag);
            NavigationUtil.backTo(this.props.navigation) 
        }
       
    }
    // 右边按钮
    getRightButton() {
        return <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    this.save()
                }}
                underlayColor="transparent"
            >
                <Text style={styles.rightButton}>保存</Text>
            </TouchableOpacity>
        </View>
    }
    // 储存修改的记录
    saveCheckValue(item){
        const checkValueArr =  this.checkValue

        if(checkValueArr.indexOf(item)<0){
            // 不存在 添加
            checkValueArr.push(item)
        }else{
            // 存在 覆盖
            checkValueArr.splice([checkValueArr.indexOf(item)],1)  
        }
        return checkValueArr
        
    }
    // 渲染每一个CHeck
    renderItems() {
        const { keys } = this.state;
        // console.log(keys)
        const options = keys.length > 0 && keys.map((items, index) => {
            return (
                <View style={styles.checkItems} key={index}>
                    <CheckBox
                        style={{ padding: 10 }}
                        onClick={() => {
                            items.checked = !items.checked ;
                           //储存修改的记录
                           this.saveCheckValue(items)
                            this.setState({
                                keys:this.state.keys
                            })
                        }}
                        isChecked={items.checked}
                        leftText={items.name}

                        checkedImage={ViewUtil.getCheckIcon(true)}
                        unCheckedImage={ViewUtil.getCheckIcon(false)}
                    />
                </View>
            )

        })
        return (
            <View style={styles.row}>
                {options}
            </View>
        )
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        };
        let navigationBar = <NavigationBar
            title={this.state.title}
            statusBar={statusBar}
            style={
                { backgroundColor: THEME_COLOR, }
            }
            rightButton={this.getRightButton()}
            leftButton={ViewUtil.getLeftBackButton(() => { this.back() })}
        />

        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView style={{ flex: 1 }}>
                    {this.renderItems()}
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    langs: state.langs
})
const mapDispatchToProps = dispatch => ({
    onRreshLanguage: flag => dispatch(actions.onRreshLanguage(flag))
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomKey)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 0
    },
    row: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee'
    },
    checkItems: {
        width: '50%',
        // backgroundColor:'red',
        padding: 10
    },
    rightButton: {
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#fff'
    }
});
