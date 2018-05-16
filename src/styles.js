import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    paddingHorizontal: 15,
    alignSelf: 'center',
    zIndex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
  },
  defaultThumb: {
    borderLeftWidth: 3,
    height: 100,
  },
  mainBlock: {
    borderRightWidth: 2,
    borderColor: '#979797',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  lastBlock: {
    borderRightWidth: 0,
  },
  subBlock: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
  },
  subBlockLine: {
    flex: 0.5,
    borderRightWidth: 1,
    borderColor: '#979797',
    height: '100%'
  },
  blocksContainer: {
    flexDirection: 'row',
  },
});

export default styles;
