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
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <Slider
        style={styles.slider}
        step={1}
        maximumValue={255}
        value={0}
        onValueChange={ val => setShoulder(val) }
        onSlidingComplete={ moveArm }
      />

      <Slider
        step={1}
        maximumValue={255}
        value={0}
        onValueChange={ val => setElbow(val) }
        onSlidingComplete={ moveArm }
      />

      <Slider
        step={1}
        maximumValue={255}
        value={0}
        onValueChange={ val => setPulse(val) }
        onSlidingComplete={ moveArm }
      />
    </View>
  );
};