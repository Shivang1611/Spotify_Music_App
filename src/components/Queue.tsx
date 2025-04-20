import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity ,Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ControlCenter from '../components/ControlCenter';
import { useState,useEffect } from 'react';
import TrackPlayer,{ State, usePlaybackState } from 'react-native-track-player';
import { playlist } from '../constants';
type TrackProps = {
    id: number;
    title: string;
    artist: string;
    artwork: string;
    url: any;
};

const TrackCard: React.FC<TrackProps> = ({ id, title, artist, artwork, url }) => {
    const playBackState = usePlaybackState();
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchCurrentTrack = async () => {
          const index = await TrackPlayer.getCurrentTrack();
          const queue = await TrackPlayer.getQueue();
      
          if (index !== null && index >= 0 && index < queue.length) {
            const track = queue[index];
            setCurrentTrackId(track.id.toString());
            console.log("Current Track ID:", track.id);
          } else {
            setCurrentTrackId(null); // Fallback if index is invalid
            console.warn("Track index out of bounds or null:", index);
          }
        };
      
        fetchCurrentTrack();
      }, [playBackState]);
      
  
    const togglePlayback = async (playback: State) => {
      console.log("loading ");
      const currentTrack = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();

  const targetIndex = queue.findIndex(track => track.id === id);
  
      if (currentTrack === targetIndex) {
        if (playback === State.Playing) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
      } else {
        await TrackPlayer.skip(targetIndex);
        await TrackPlayer.play();
        setCurrentTrackId(id.toString());
      }
    };
    
  
  return (
    <TouchableOpacity onPress={() => togglePlayback(playBackState)}>
    <View style={styles.card}>
    
      <Image source={{ uri: artwork }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
  
    <Pressable onPress={() => togglePlayback(playBackState)}>
                <Icon 
                style={styles.icon} 
                name={id.toString() === currentTrackId && playBackState === State.Playing ? "pause" : "play-arrow"}
                size={35} />
            </Pressable>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#90C67C',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 70,
    borderRadius: 8,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color:"#FFF"
    
  },
  artist: {
    color: '#555',
  },
  icon: {
    color: '#FFFFFF',
  },
});

export default TrackCard;