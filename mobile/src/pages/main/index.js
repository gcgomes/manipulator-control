import React, {useState} from 'react';
import {View, Image, Text, Slider, TouchableOpacity} from 'react-native';

import api from "../../services/api";

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Main() {
  const [shoulder, setShoulder] = useState(90);
  const [elbow, setElbow] = useState(90);
  const [pulse, setPulse] = useState(90);

  function moveArm() {
    api.post('/mover-braco', {shoulder, elbow, pulse});
  }

  function grab() {
    api.get('/agarrar');
  }

  async function play() {
    await api.get('/rodar');
  }

  function stop() {
    api.get('/parar');
  }

  async function savePosition1() {
    await api.post('/salvar-posicao-1', {shoulder, elbow, pulse});
  }

  async function savePosition2() {
    await api.post('/salvar-posicao-2', {shoulder, elbow, pulse});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Ombro</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (shoulder/180) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={1}
            maximumValue={180}
            value={shoulder}
            onValueChange={val => setShoulder(val) }
            onSlidingComplete={moveArm}
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Cotovelo</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (elbow/180) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={1}
            maximumValue={180}
            value={elbow}
            onValueChange={val => setElbow(val) }
            onSlidingComplete={moveArm}
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>

      <View style={styles.sliderView}>
        <Text style={styles.description}>Pulso</Text>

        <View style={{borderRadius: 50, overflow: 'hidden'}}>
          <View style={{flexDirection: 'row', position: 'absolute'}}>
            <View style={{...styles.sliderDummy, width: (pulse/180) * 300}}/>
            <View style={styles.sliderReal}/>
          </View>

          <Slider
            style={{width: 300, height: 30, borderRadius: 50}}
            minimumValue={1}
            maximumValue={180}
            value={pulse}
            onValueChange={val => setPulse(val) }
            onSlidingComplete={moveArm}
            minimumTrackTintColor='transparent'
            maximumTrackTintColor='transparent'
            thumbTintColor='transparent'
          />
        </View>
      </View>

      <View style={{...styles.actions, justifyContent: 'center'}}>
        <TouchableOpacity style={styles.action} onPress={grab}>
          <Text style={styles.actionText}>Agarrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={savePosition1}>
          <Text style={styles.actionText}>Salvar 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={savePosition2}>
          <Text style={styles.actionText}>Salvar 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={play}>
          <Text style={styles.actionText}>Rodar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={stop}>
          <Text style={styles.actionText}>Parar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};