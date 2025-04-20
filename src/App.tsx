import React, {useState, useEffect} from "react"

import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  
  View,
} from 'react-native';

import {setupPlayer, addTrack} from "../musicPlayerServices"
import MusicPlayer from "./screens/MusicPlayer";

import Song_list from "./screens/Song_list";


function App(): JSX.Element {
  const [isPlayerReady, setIsPaylerReady] = useState(false)

  async function setup(){
    let isSetup = await setupPlayer()

    if (isSetup) {
      await addTrack()
    }

    setIsPaylerReady(isSetup)
  }

  useEffect(() => {
    setup()
  }, [])
  
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <MusicPlayer />
      </View>
      <Song_list/>

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height:800,
  }
});

export default App;
