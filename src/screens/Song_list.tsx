// src/screens/AllTracksScreen.tsx
import React from 'react';
import { View, FlatList, SafeAreaView,ScrollView } from 'react-native';
import TrackCard from '../components/Queue';
import { playlist } from '../constants';

const AllTracksScreen: React.FC = () => {
 

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 , backgroundColor:"#001d23"}}>
       <ScrollView>
      {playlist.map(track => (
        <TrackCard
          key={track.id}
          id={track.id}
          title={track.title || 'Unknown Title'}
          artist={track.artist || 'Unknown Artist'}
          artwork={String(track.artwork) || 'default-artwork-url'}
          url={track.url}
        />
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default AllTracksScreen;
