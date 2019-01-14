/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';

import actions from '../actions/index'
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CheckBox from 'react-native-check-box'
import BackPressComponent from '../common/BackPressComponent'
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import SortableListView from 'react-native-sortable-listview'

import { MORE_MENUS } from '../common/MoreMenus'
import ViewUtil from '../utils/ViewUtil'

import { LANGUAGE_FLAG } from '../utils/expand/LanguageDao'
import LanguageDao from '../utils/expand/LanguageDao'

// import Test from '../common/Test'



import NavigationUtil from '../utils/NavigationUtil'

const THEME_COLOR = "#3697ff"
class SortKey extends Component {

    constructor(props) {
        super(props);
        const { flag, isDelect } = this.props.navigation.state.params
        // alert(flag) 
        this.flag = flag
        let title = flag == LANGUAGE_FLAG.keys ? '标签排序' : '语言排序'

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
        // 标签配置页面
        if (!langs[this.flag]) {
            languageDao.fetch().then((res) => {
                this.setState({
                    // 只显示checked==true的项
                    keys: this.getAllChecked(res)
                })
            })
        } else {
            this.setState({
                keys: this.getAllChecked(langs[this.flag])
            })
        }

    }

    componentWillUnmount() {
        this.backPressComponent.componentWillUnmount()
    }

    // 移除页面获取的是所有已经选择的
    getAllChecked(keys) {
        this.checkArr = {}
        keys.map((item, index) => {
            if (item.checked) {
                this.checkArr[item.name] = item
            }
        })

        return this.checkArr
    }

    // 返回键处理
    onBackPress = () => {
        this.back()
        return true
    }
    // 返回函数
    back() {
        // 检查是否有历史操作记录
        const checkValueArr = this.checkValue;
        if (!checkValueArr.length) {
            // 没有历史项则直接返回
            NavigationUtil.backTo(this.props.navigation)
        } else {
            // 有记录则需要刷新 页面 保存数据在返回
            Alert.alert(
                '小贴士提醒您',
                '是否要保存修改？',
                [
                    {
                        text: '取消', onPress: () => {
                            NavigationUtil.backTo(this.props.navigation)
                        }, style: 'cancel'
                    },
                    {
                        text: '保存', onPress: () => {
                            this.save()
                        }
                    },
                ],
                { cancelable: false }
            )
        }

    }
    // 保存结果
    save = () => {
        const checkValueArr = this.checkValue;
        if (!checkValueArr.length) return;

        let onRreshLanguage = this.props.onRreshLanguage
        const { keys } = this.state;
        const languageDao = new LanguageDao(this.flag)
        

        let sortKeys = this.props.langs[this.flag] // 是数组
console.log(this.props.langs,sortKeys )    
        // this.sortNameArr.map((item)=>{
        //     sortKeys[item] = this.checkArr[item]             
        // })


        //     // 配置标签则直接保存
        //     languageDao.save(keys);
        //     onRreshLanguage(this.flag);
        //     NavigationUtil.backTo(this.props.navigation)
        

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
    saveCheckValue(item) {
        const checkValueArr = this.checkValue

        if (checkValueArr.indexOf(item) < 0) {
            // 不存在 添加
            checkValueArr.push(item)
        } else {
            // 存在 覆盖
            checkValueArr.splice([checkValueArr.indexOf(item)], 1)
        }
        return checkValueArr

    }
    // 渲染每一个CHeck
    renderItems(item) {
        const { keys } = this.state;
        return (
            <TouchableOpacity  >
                <View style={styles.row} >
                    <MaterialCommunityIcons
                        name={'sort'}
                        size={16}
                        style={{ color: THEME_COLOR }}
                    ></MaterialCommunityIcons>
                    <View>
                        <Text style={{ textAlign: 'left' }}>
                            {item.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
        )
    }
    // 排序函数
    sort(e){
        const {to,from,row} = e;
        this.saveCheckValue(row);//储存操作历史
        let keys = this.state.keys;
        this.sortNameArr = Object.keys(this.state.keys);

        let item =  this.sortNameArr.splice(from,1);        
        this.sortNameArr.splice(to,1,item[0]);
        console.log(this.sortNameArr)
        let  res = {};
        this.sortNameArr.map(item=>{
            res[item]= keys[item] 
        })
        this.checkArr = res 
        this.setState({
            keys: res
        })
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

        let data = this.state.keys;
        // console.log(data)
        let order = Object.keys(data) //Array of keys
        return (
            <View style={styles.container}>
                {navigationBar}

                <View style={{ flex: 1 }}>
                    <SortableListView
                        data={data}
                        order={order}
                        disableSorting={false}
                        onRowMoved  ={e => {
                          this.sort(e)
                        }}
                        renderRow={(row) => { return this.renderItems(row) }
                        }
                    ></SortableListView>
                </View>

            </View >
        )
    }
}
const mapStateToProps = state => ({
    langs: state.langs
})
const mapDispatchToProps = dispatch => ({
    onRreshLanguage: flag => dispatch(actions.onRreshLanguage(flag))
})
export default connect(mapStateToProps, mapDispatchToProps)(SortKey)


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
        padding: 15
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
