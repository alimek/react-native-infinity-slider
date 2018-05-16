# react-native-infinity-slider
Infinity slider for React Native - Slider with infinity minimum and maximum value on both side. `Android` and `iOS` platform supported.

# Props

# How to use it

```js
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
```
# Example

```bash
$ cd example
$ yarn
$ react-native run-ios
```

# License

MIT
