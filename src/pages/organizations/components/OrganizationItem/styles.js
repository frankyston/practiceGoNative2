import { StyleSheet } from 'react-native';
import { colors, metrics, general } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    flex: 1,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: (metrics.screenWidth - 60) / 2,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: metrics.baseMargin,
  },

  columnContainer: {
    marginHorizontal: metrics.basePadding,
    justifyContent: 'space-between',
  },
});

export default styles;
