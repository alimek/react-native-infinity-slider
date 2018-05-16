// @flow
import React from 'react';
import ReactNative from 'react-native';

import styles from './styles';
import type { RNInfinitySliderPropTypes, RNInfinitySliderState, GestureState} from './types';

const {
  View,
  PanResponder,
  Dimensions,
  Animated,
} = ReactNative;

const { width } = Dimensions.get('window');

const generateArrayBlock = length => new Array(length).fill(0);

class ReactNativeInfinitySlider extends React.PureComponent<RNInfinitySliderPropTypes, RNInfinitySliderState> {
  static defaultProps = {
    yRange: [10, 50, 80, 100, 110],
    yValues: [0.1, 0.5, 1, 10, 50],
    xStep: 5,
    thumbColor: '#69D4F2',
    thumbStyle: null,
  };

  changeStepValue: number = 0;
  previewValue: number = 0;
  currentXStep: number = 0;
  currentMultiplicity: number = 0;

  panResponse = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      this.setState({ isMoving: true });
      this.changeStepValue = this.state.value;
    },
    onPanResponderMove: (evt, gestureState: GestureState) => {
      this.changeValueOnMove(gestureState.dx, gestureState.dy);
    },
    onPanResponderRelease: () => {
      this.currentXStep = 0;
      this.setState({
        value: this.previewValue,
        isMoving: false,
      });
    },
  });

  constructor(props: RNInfinitySliderPropTypes) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
    this.currentXStep = 0;
    this.previewValue = props.initialValue;
    this.changeStepValue = props.initialValue;
  }

  changeValueOnMove = (fromX: number, fromY: number) => {
    const { onValueChange } = this.props;
    const lastXStep = this.currentXStep;
    const lastMultiplicity = this.currentMultiplicity;

    const shouldIncrement = fromX >= 0;
    const change = this.calculateChangedValue(fromX, fromY);

    if (lastMultiplicity !== this.currentMultiplicity) {
      console.log('zmiana range Y -', 'X', this.currentXStep, 'Y ', this.currentMultiplicity);
      this.changeStepValue = this.previewValue;
      this.currentXStep = 0;
    }

    let newValue = 0;

    if (shouldIncrement) {
      newValue = this.changeStepValue + change;
    } else {
      newValue = this.changeStepValue - change;
    }

    if (lastXStep !== this.currentXStep) {
      console.log('zmiana range X -', 'X', this.currentXStep, 'Y ', this.currentMultiplicity);
      this.previewValue = newValue;
      onValueChange(newValue);
    }
  };

  calculateChangedValue = (fromX: number, fromY: number) => {
    const xStep = this.calculateXValue(Math.abs(fromX));
    const multiplicityLevel = this.calculateMultiplicity(fromY);
    this.currentXStep = xStep;

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

    for (const [index, maxYRange] of yRange.entries()) {
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
          if (index === yRange.length -1 && distanceAbs >= maxYRange) {
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
    const mainBlocks = generateArrayBlock(5);
    const subBlocks = generateArrayBlock(4);

    return (
      <View style={styles.blocksContainer}>
        {
          mainBlocks.map((arrayBlock, index) => (
            <View
              key={index}
              style={[
                styles.mainBlock,
                index === (mainBlocks.length - 1) ? styles.lastBlock : null,
              ]}
            >
              {
                subBlocks.map((arrayBlock, index) => (
                  <View
                    key={index}
                    style={[
                      index === (subBlocks.length - 1) ? styles.lastBlock : null,
                      styles.subBlock,
                    ]}
                  >
                    <View style={styles.subBlockLine} />
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
    );
  };

  render() {
    const { renderThumb, renderBackground } = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.backgroundContainer}>
          {renderBackground ? renderBackground() : this.renderDefaultBackground()}
        </View>
        <Animated.View
          style={styles.middleContainer}
          {...this.panResponse.panHandlers}
        >
          {renderThumb ? renderThumb() : this.renderDefaultThumb()}
        </Animated.View>
      </View>
    );
  }
}

export default ReactNativeInfinitySlider;
