/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview'
import BaseItem  from '../common/BaseItem'

class PopularItem extends BaseItem {
    
    render() {
        const {projectModel } = this.props
        // console.log(item)
        const item =  projectModel.item;
        // const {item} =  projectModel;
        if (!item || !item.owner) return null;


        let description = '<p>'+ item.description+'</p>'
        return (
            <TouchableOpacity
                onPress={() => { this.props.onSelect() }}
            >
                <View style={styles.cell_container}>
                    <Text  style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}> 
                        {item.meta}
                    </Text>
                    <HTMLView
                        value={description}
                        onLinkPress={(url)=>{

                        }}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description,
                        }}
                    ></HTMLView>  
                    {/* <Text style={styles.description}> 
                        {item.description}
                    </Text> */}
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                            <Text> Author:</Text>
                            <Image style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            ></Image>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                            <Text> Start:</Text>
                            <Text> {item.stargazers_count}</Text>
                           
                        </View> */} 
                        {this._favoriteicon()} 
                    </View>

                </View>

            </TouchableOpacity>
        );
    }
}
export default PopularItem


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cell_container:{
        backgroundColor:'#ffff',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#ddd',
        borderWidth:.5,
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2  //安卓的阴影
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row', 
        alignItems: 'center'
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    }
});
