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
    marginTop: 60,
  },

  slider: {
    color: '#119EC2',
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
  },

  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  action: {
    backgroundColor: '#119EC2',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
});