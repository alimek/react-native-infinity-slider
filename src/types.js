export type RNInfinitySliderPropTypes = {
  value: number,
  onValueChange: Function,
  yRange?: Array<number>,
  yValues?: Array<number>,
  xStep?: number,
  renderThumb?: Function,
  renderDefaultBackground?: Function,
  thumbStyle?: Object,
};

export type RNInfinitySliderState = {
  value: number,
  previewValue: number,
  currentXStep: number,
  isMoving: boolean,
  width: number,
};

export type Event = {
  nativeEvent: {
    layout: {
      width: number,
    },
  },
};

export type GestureState = {
  dy: number,
  dx: number,
};