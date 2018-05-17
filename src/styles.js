import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 100,
    position: 'relative',
  },
  middleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  defaultThumb: {
    borderLeftWidth: 3,
    height: 80,
    alignSelf: 'center',
  },
  mainBlock: {
    borderRightWidth: 2,
    borderColor: '#979797',
    height: 60,
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
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#979797',
    height: '100%',
  },
  blocksContainer: {
    flexDirection: 'row',
  },
});

export default styles;
