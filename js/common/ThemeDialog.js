/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal,ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Themes from '../res/data/theme.json'  
import actions from '../actions/index' 

import ThemeDao from '../utils/expand/ThemeDao'      
const themeDao = new ThemeDao() 


class ThemeDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible:false
        }
    }
    // 显示控制
    dismiss=(bool)=> { 
        // alert(1) 
        this.setState({
            visible: bool 
        }) 
    }
    // 点击选择主题色
    handle(item){
        let themeColor = item.color      
        themeDao.save(themeColor)  //保存主题色  
        this.props.onSelectTheme(themeColor)              //触发redux
        
        this.dismiss(false)
    }
    renderItems(){
        const items = Themes.map((item,index)=>{
            return <View style={[styles.themeItems,{backgroundColor:item.color}]} key={index}>
            <Text style={{color:'#fff'}} onPress={()=>{this.handle(item)}}>{item.name}</Text></View> 
        })
        return (
            <View style={styles.content} >
                {items}
            </View>
        )

    }
    render() {
        return (
            <Modal  
                transparent={true}    
                visible={this.state.visible} 
                onRequestClose={() => {}}   
                animationType="slide" 
            >
               <View style={styles.container}>
                   <ScrollView style={{}}>  
                        {this.renderItems()}
                   </ScrollView>
               </View>

            </Modal>  
        )
    }
}
const mapDispatchToProps = dispatch => ({
    onSelectTheme: (themeColor) => dispatch(actions.onSelectTheme(themeColor)) 
})
const mapStateToProps = state => ({
 
})
export default connect( mapStateToProps, mapDispatchToProps,null, { forwardRef: true })(ThemeDialog) 
// export default ThemeDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        padding:6
    }, 
  
    content:{
        backgroundColor:'#fff',
        borderRadius:3,
        flexWrap: 'wrap',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex:1 ,
        padding:6
    },
    themeItems:{
        height:100,
        width:100, 
        borderRadius:3,
        justifyContent: 'center',
        alignItems: 'center',
        margin:4,  
        color:'#fff' 
    }

});
