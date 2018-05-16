// @flow
import React, { Component } from 'react';
import ReactNative from 'react-native';

import RNInfinitySlider from 'react-native-infinity-slider';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

export default class App extends Component {
  state = {
    value: 0,
  };

  onValueChanged = value => this.setState({ value});

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Value: {this.state.value}</Text>
        </View>
        <RNInfinitySlider
          initialValue={0}
          onValueChange={this.onValueChanged}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
