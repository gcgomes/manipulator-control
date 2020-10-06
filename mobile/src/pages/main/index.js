import React, {useState, useEffect} from 'react';
// import {Feather} from '@expo/vector-icons';
import {View, Image, Text, Slider} from 'react-native';
// import * from 'react-native-slider-button';

import api from "../../services/api";

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Main() {
  const [shoulder, setShoulder] = useState(0);
  const [elbow, setElbow] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [grab, setGrab] = useState(false);

  async function moveArm() {
    await api.post('mover-braco', {shoulder, elbow, pulse, grab});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Ombro {shoulder}</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (shoulder/50) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={0}
            maximumValue={100}
            value={shoulder}
            onValueChange={val => setShoulder(val) }
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Cotovelo {elbow}</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (elbow/50) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={0}
            maximumValue={100}
            value={elbow}
            onValueChange={val => setElbow(val) }
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Pulso {pulse}</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (pulse/50) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={0}
            maximumValue={100}
            value={pulse}
            onValueChange={val => setPulse(val) }
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>
    </View>
  );
};