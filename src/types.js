export type RNInfinitySliderPropTypes = {
  value: number,
  onValueChange: Function,
  yRange?: Array<number>,
  yValues?: Array<number>,
  xStep?: number,
  renderThumb?: Function,
  renderDefaultBackground?: Function,
  thumbColor?: string,
  thumbStyle?: Object,
};

export type RNInfinitySliderState = {
  value: number,
  previewValue: number,
  currentXStep: number,
  isMoving: boolean,
};

export type GestureState = {
  dy: number,
  dx: number,
};