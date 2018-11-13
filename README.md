# react-native-infinity-slider
Infinity slider for React Native - Pure JS Slider with infinity value on both side. `Android` and `iOS` platform supported. Tested on `RN` version `0.55.x`.

[Problem and solution discussion](https://ux.stackexchange.com/q/65119)

![2018-05-15 23-13-00](https://thumbs.gfycat.com/MasculineBeneficialLice-max-1mb.gif)

# Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | `Number` | required | Default value which will be used. |
| onValueChange | `Function` | required | Callback called on every value changed. `value: Number` as parameter.|
| yRange | `Array<Number>` | | Distance from start touch point on Y Axis to calculate multiplicity value when moving left/right |
| yValues | `Array<Number>` | | Values which will be added to `value` when you moved left/right |
| xStep | `Number` | 10 | Distance which you have to move to increment/decrement value |
| renderThumb | `Function` | optional | Function to render thumb - middle component which is fixed |
| renderBackground | `Function` | optional | Function to render background - should be positioned absolutely. |
| thumbStyle | `Object` | optional | You can pass your style to overwrite default one |
| containerStyle | `Object` | optional | You can pass your style to overwrite main container style |

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

  onValueChanged = value => this.setState({ value });

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Value: {this.state.value}</Text>
        </View>
        <RNInfinitySlider
          value={this.state.value}
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
