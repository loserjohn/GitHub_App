/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
   
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import { connect } from 'react-redux';

class Detail extends Component {
  constructor(props){
    super(props);
    console.log(this.props.navigation.state.params.itemData.fullName)       
  }
  renderTitleView() {
    return <View>
      <TouchableOpacity
        onPress={() => { this.dialog.show() }}
        underlayColor="transparent"
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            fontSize: 18,
            color: '#ffffff',
            fontWeight: '400'
          }}>趋势{this.state.timeSpan.showText}</Text>
          <MaterialIcons
            name={'arrow-drop-up'}
            size={22}
            style={{ color: 'white' }}
          ></MaterialIcons>
        </View>
      </TouchableOpacity>

    </View>

  }
  
  render() {

    return (
      <View style={styles.container}>
        <NavigationBar
          // title={'趋势'}
          titleView={
            this.renderTitleView()
          }
          statusBar={statusBar}
          style={{
            backgroundColor: THEME_COLOR
          }}
        />

        <Text style={styles.welcome}>Detail</Text>
      </View> 
    );
  }
}
const mapStateToProps = state =>({
  nav:state.nav
})

export default connect(mapStateToProps)(Detail)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
