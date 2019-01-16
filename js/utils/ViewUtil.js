
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
export default class ViewUtil {

    // 左边返回按钮
    static getLeftBackButton(callback) {
        return <TouchableOpacity
            style={{ padding: 8, paddingLeft: 12 }}
            onPress={callback}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{ color: '#fff' }}
            ></Ionicons>
        </TouchableOpacity>
    }

    // 页面的分享按钮
    static getShareButton(callback) {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callback}
        >
            <Ionicons
                name={'md-share'}
                size={20}
                style={{ color: '#fff', opacity: 0.9, marginRight: 10 }}
            ></Ionicons>
        </TouchableOpacity>
    }

    // itemPanl
    static getSettingItem(callback,text, color, Icons,icon, collapseIcon) {
    //    alert(text)  
        const ItemIcon = Icons&&icon ? <Icons
            name={icon}
            size={16}
            style={{ color: color }}
        ></Icons> : <View style={{opacity:1,width:16,height:16,marginRight:15}}></View>

        const ItemLink = <Feather
            name={ collapseIcon?collapseIcon:'chevron-right'}
            size={16}
            style={{ color: color?color:'#d3d3d3' }} 
        ></Feather>

        
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callback} 
        >
            <View style={styles.row}>
                {ItemIcon}
                <Text style={{ textAlign: 'left',flex:1,paddingLeft:15 }}>{text}</Text> 
                {ItemLink} 
            </View>
            <View style={styles.line}></View> 
        </TouchableOpacity>
    }


    // 菜单图标
    static getMenuItem(callback,menu,color,collapseIcon){
        return ViewUtil.getSettingItem(callback,menu.name,color,menu.Icons,menu.icon,collapseIcon)
        
    }

    // 选中图标
    static getCheckIcon(color,bool){
        return <Ionicons
        name={bool?'ios-checkbox':'ios-checkbox-outline'}
        size={20}
        style={{ color: bool?color:'#d3d3d3', opacity: 0.9, marginRight: 10 }} 
    ></Ionicons>
  
    }
}





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
        height: .5,
        backgroundColor: '#eee'
    },
});