import React, { useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Maps = () => {
  const {
    haslocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    currentUserPosition,
    stopFollowUserLocation,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const followMe = useRef<boolean>(true);

  useEffect(() => {
    if (!followMe.current) {
      return;
    }
    const { latitude, longitude } = currentUserPosition;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  }, [followUser, currentUserPosition]);

  useEffect(() => {
    followUser();
    return () => {
      stopFollowUserLocation();
    };
  }, [followUser, stopFollowUserLocation]);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    followMe.current = true;
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  if (!haslocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => {
          followMe.current = false;
        }}>
        <Marker
          image={require('../assets/carlos.png')}
          coordinate={{
            latitude: initialPosition!.latitude,
            longitude: initialPosition!.longitude,
          }}
          title="Carlos Raez"
          description="Hello, I am here"
        />
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      />
    </>
  );
};
