/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

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
        this.flag = flag
        let title = flag == LANGUAGE_FLAG.keys ? '自定义标签' : '自定义语言'
        // title = isDelect?

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

        // console.log(2,keys)       
        if (!langs[this.flag]) {

            const languageDao = new LanguageDao(this.flag)
            languageDao.fetch().then((res) => {
                // console.log(1,res)   
                this.setState({
                    keys: res  
                })
            })
        } else {
            this.setState({
                keys: langs[this.flag]
            })
        }


    }

    componentWillUnmount() {
        this.backPressComponent.componentWillUnmount()
    }

    onBackPress = () => {

        this.back()
        return false
    }

    back() {
        // alert('返回项目')
    }

    getRightButton() {
        return <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {

                }}
                underlayColor="transparent"
            >
                <Text style={styles.rightButton}>保存</Text>
            </TouchableOpacity>
        </View>
    }
    renderItems() {
        const { keys } = this.state;
        console.log(keys)
        const options = keys.length > 0 && keys.map((items,index) => {
            return (
                <View style={styles.checkItems} key={index}>
                    <CheckBox
                        style={{padding: 10}}
                        onClick={(check)=>{ 

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
                <ScrollView style={{flex:1}}>  
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
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
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
        width:'100%' ,
        flexWrap:'wrap'
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#eee'
    },
    checkItems:{
        width:'50%',
        // backgroundColor:'red',
        padding:10
    },
    rightButton:{
        paddingHorizontal:15,
        fontSize:16,
        color:'#fff'
    }
});
