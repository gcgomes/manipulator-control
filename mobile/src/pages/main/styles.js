import {StyleSheet} from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },

  sliderView: {
    marginTop: 80,
  },

  slider: {
    color: '#000000',
    fontSize: 30,
  },

  sliderDummy: {
    backgroundColor: '#119EC2',
    width: 300,
    height:30,
    borderRadius: 50,
    position: 'absolute',
  },

  sliderReal: {
    backgroundColor: '#119EC2',
    height:30,
  }
});