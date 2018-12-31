/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpans from '../model/TimeSpan'


export const  timeSpans = [ 
    new TimeSpans('今 天 ','since=daily'),
    new TimeSpans('本 周','since=weekly'), 
    new TimeSpans('本 月','since=monthly') 
]

class TrendingDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible:false
        }
    }

    show() {
        this.setState({
            visible: true
        })
    }
    dismiss() {
        // alert(1)
        this.setState({
            visible: false
        }) 
    }
    render() {
        const { onClose, onSelect } = this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible} 
                onRequestClose={() => {onClose}}  
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.dismiss()} 
                >
                    <MaterialIcons
                          name={'arrow-drop-up'} 
                        size={36}
                        style={styles.arrow}
                    >
                    
                    </MaterialIcons> 
                     <View style={styles.content}>
                            {timeSpans.map((result,i,arr)=>{
                                return <TouchableOpacity
                                onPress={() => onSelect(arr[i])}    
                                underlayColor="transparent"
                                key={i}
                                >
                                    <View style={styles.text_container} >
                                        <Text  style={styles.text}>
                                            {arr[i].showText}
                                        </Text>                                    
                                    </View>
                                    {
                                            i!=timeSpans.length-1?
                                            <View style={styles.line}></View>:null
                                        }
                                </TouchableOpacity> 
                            })}
                        
                        </View> 

                </TouchableOpacity>



            </Modal> 
        )
    }
}
export default TrendingDialog


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -16
    },
    content:{
        backgroundColor:'#fff',
        borderRadius:3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3
    },
    text_container:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row' 
    },
    text:{
        fontSize:16,
        color:'black',
        fontWeight:'400',
        padding:8,
        paddingLeft:26,
        paddingRight:26
    },
    line:{
        height:.3,
        backgroundColor:'#ddd'
    }

});
