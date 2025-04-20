import { View, Text } from 'react-native'
import { playlist } from '../constants';
import React from 'react'
import Song_list from "./Song_list";
const Home_Page = () => {
  return (
    <View  >
    <Song_list/>
    </View>
  )
}

export default Home_Page