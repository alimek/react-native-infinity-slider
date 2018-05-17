// @flow
import React from 'react';
import ReactNative from 'react-native';

import styles from './styles';
import type { RNInfinitySliderPropTypes, RNInfinitySliderState, GestureState } from './types';

const {
  View,
  PanResponder,
  Dimensions,
  Animated,
  Platform,
} = ReactNative;

const { width } = Dimensions.get('window');

const generateArrayBlock = length => new Array(length).fill(0);

class ReactNativeInfinitySlider extends React.PureComponent<RNInfinitySliderPropTypes, RNInfinitySliderState> {
  static defaultProps = {
    yRange: [20, 50, 80, 100, 110],
    yValues: [0.1, 0.5, 1, 10, 50],
    xStep: 10,
    thumbColor: '#69D4F2',
    thumbStyle: null,
  };

  constructor(props: RNInfinitySliderPropTypes) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
    this.currentXStep = 0;
    this.previewValue = props.initialValue;
    this.changeStepValue = props.initialValue;
  }

  scaleThumbAnimation = new Animated.Value(1);
  scaleXAnimation = new Animated.Value(0);
  changeStepValue: number = 0;
  previewValue: number = 0;
  currentXStep: number = 0;
  animationXStep: number = 0;
  currentMultiplicity: number = 0;
  panResponse = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.changeStepValue = this.state.value;
    },
    onPanResponderMove: (evt, gestureState: GestureState) => {
      this.changeValueOnMove(gestureState.dx, gestureState.dy);
    },
    onPanResponderRelease: () => {
      this.currentXStep = 0;
      this.animationXStep = 0;
      this.currentMultiplicity = this.props.yValues[0];
      this.animateThumb(this.currentMultiplicity);
      this.animateX(0);
      this.setState({
        value: this.previewValue,
      });
    },
  });

  animateThumb = (toValue: number) => Animated
    .timing(
      this.scaleThumbAnimation,
      {
        toValue,
        duration: 200,
        useNativeDriver: true,
      },
    ).start();

  animateX = (toValue: number) => Animated
    .spring(
      this.scaleXAnimation,
      {
        toValue,
        useNativeDriver: true,
      },
    ).start();

  changeValueOnMove = (fromX: number, fromY: number) => {
    const { onValueChange } = this.props;
    const lastXStep = this.currentXStep;
    const lastMultiplicity = this.currentMultiplicity;

    const shouldIncrement = this.shouldIcrement(fromX);
    const change = this.calculateChangedValue(fromX, fromY);

    if (lastMultiplicity !== this.currentMultiplicity) {
      this.animateThumb(this.currentMultiplicity);
      this.changeStepValue = this.previewValue;
      this.currentXStep = 0;
    }

    let newValue = 0;

    if (shouldIncrement) {
      newValue = this.changeStepValue + change;
    } else {
      newValue = this.changeStepValue - change;
    }

    newValue = parseFloat(parseFloat(newValue).toFixed(2));

    if (lastXStep !== this.currentXStep) {
      this.animateX(this.animationXStep);
      this.previewValue = newValue;
      onValueChange(newValue);
    }
  };

  shouldIcrement = (fromX: number): boolean => fromX > 0;

  calculateChangedValue = (fromX: number, fromY: number): number => {
    const xStep = this.calculateXValue(Math.abs(fromX));
    const multiplicityLevel = this.calculateMultiplicity(fromY);
    this.currentXStep = xStep;
    this.animationXStep = this.shouldIcrement(fromX) ? xStep : -xStep;

    return parseFloat(parseFloat(multiplicityLevel * xStep).toFixed(2));
  };

  calculateXValue = (fromX: number): number => {
    const { xStep } = this.props;
    const modulo = Math.round(fromX) % xStep;

    if (modulo === 0) {
      return parseInt(fromX / xStep, 10);
    }

    return this.currentXStep;
  };

  calculateMultiplicity = (distanceFromPoint: number): number => {
    const { yRange, yValues } = this.props;

    let rangeIndex = null;
    const distanceAbs = Math.abs(distanceFromPoint);

    for (let index = 0; index < yRange.length; index += 1) {
      const maxYRange = yRange[index];
      let checkedValue = false;

      switch (index) {
        case 0: {
          if (distanceAbs < maxYRange) {
            checkedValue = true;
            rangeIndex = index;
          }
          break;
        }
        default: {
          if (index === (yRange.length - 1) && distanceAbs >= maxYRange) {
            checkedValue = true;
            rangeIndex = index;
            break;
          }

          if (distanceAbs < maxYRange && distanceAbs >= yRange[index - 1]) {
            checkedValue = true;
            rangeIndex = index;
          }
          break;
        }
      }

      if (checkedValue) {
        break;
      }
    }

    this.currentMultiplicity = yValues[rangeIndex];
    return this.currentMultiplicity;
  };

  renderDefaultThumb = () => (
    <View
      style={[
        styles.defaultThumb,
        {
          borderColor: this.props.thumbColor,
        },
        this.props.thumbStyle ? this.props.thumbStyle : null,
      ]}
    />
  );

  renderDefaultBackground = () => {
    const { xStep } = this.props;
    const oneBlockWidth = (width + 40) / 6;
    const translateValues = Platform
      .select({
        ios: {
          subViewAmount: 12,
          outputRange: [-oneBlockWidth * 3 - 200, -(oneBlockWidth - 0.5) * 3, -oneBlockWidth * 3 + 200],

        },
        android: {
          subViewAmount: 5,
          outputRange: [-100, 0, 100],
        },
      });
    const mainBlocks = generateArrayBlock(translateValues.subViewAmount);
    const subBlocks = generateArrayBlock(5);
    const minInput = parseInt((width + 40) / xStep, 10);

    return (
      <Animated.View
        style={[
          styles.blocksContainer,
          {
            transform: [
              {
                translateX: this.scaleXAnimation.interpolate({
                  inputRange: [-minInput, 0, minInput],
                  outputRange: translateValues.outputRange,
                }),
              },
            ],
          },
        ]}
      >
        {
          mainBlocks.map((arrayBlock, index) => (
            <View
              key={index} //eslint-disable-line
              style={[
                styles.mainBlock,
                index === (mainBlocks.length - 1) ? styles.lastBlock : null,
                {
                  width: oneBlockWidth,
                },
              ]}
            >
              {
                subBlocks.map((subBlock, index2) => (
                  <View
                    key={index2} //eslint-disable-line
                    style={[
                      index2 === (subBlocks.length - 1) ? styles.lastBlock : null,
                      styles.subBlock,
                    ]}
                  >
                    {index2 !== (subBlocks.length - 1) ? <View style={styles.subBlockLine} /> : null}
                  </View>
                ))
              }
            </View>
          ))
        }
      </Animated.View>
    );
  };

  render() {
    const { renderThumb, renderBackground, yValues } = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.backgroundContainer}>
          {renderBackground ? renderBackground() : this.renderDefaultBackground()}
        </View>
        <Animated.View
          style={[
            styles.middleContainer,
            {
              transform: [
                {
                  scale: this.scaleThumbAnimation.interpolate({
                    inputRange: [yValues[0], yValues[yValues.length - 1]],
                    outputRange: [0.9, 1.1],
                  }),
                },
              ],
            },
          ]}
          {...this.panResponse.panHandlers}
        >
          {renderThumb ? renderThumb() : this.renderDefaultThumb()}
        </Animated.View>
      </View>
    );
  }
}

export default ReactNativeInfinitySlider;
