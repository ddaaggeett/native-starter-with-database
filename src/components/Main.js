import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class ClimbLogger extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <View style={styles.container}>
            <Button title="go to user page" onPress={() => this.props.navigation.navigate('user')} />
            <Text>MAIN PAGE</Text>
            <Button title="  +  " onPress={() => this.props.countUp()} />
            <Text>{this.props.local.count}</Text>
            <Button title="  -  " onPress={() => this.props.countDown()} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
