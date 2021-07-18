import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Audio } from 'expo-av';

const bellFile = require('./assets/bell.mp3')


export default function App () {
  const [bellSound, setBellSound] = useState<Audio.Sound>()
  
  const playSound = async () => {
    console.log('playing sound');
    await bellSound?.replayAsync(); 
  }

  const handleOnPress = () => {
    playSound()
  }

  useEffect(() => {
    const loadSounds = async () => {
      console.log('loading sound');
      
      const { sound } = await Audio.Sound.createAsync(bellFile)
      setBellSound(sound)
    }
    
    loadSounds()

    return () => {
      console.log('unloading sound');
      bellSound?.unloadAsync()
    }
  }, [])

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={handleOnPress}>
        <Text style={styles.button}>Tap to play sound</Text>
      </TouchableHighlight>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#a58702',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16
  }
});
