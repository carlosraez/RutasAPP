import { useEffect, useState, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [haslocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const [currentUserPosition, setCurrentUserPosition] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const wathId = useRef<number>();

  useEffect(() => {
    getCurrentLocation().then(resp => {
      setInitialPosition(resp);
      setCurrentUserPosition(resp);
      setRouteLines(routes => [...routes, resp]);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = () => {
    return new Promise<Location>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            longitude: coords.longitude,
            latitude: coords.latitude,
          });
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true },
      );
    });
  };

  const followUser = () => {
    wathId.current = Geolocation.watchPosition(
      ({ coords }) => {
        const location: Location = {
          longitude: coords.longitude,
          latitude: coords.latitude,
        };
        setCurrentUserPosition({
          longitude: coords.longitude,
          latitude: coords.latitude,
        });
        setRouteLines(routes => [...routes, location]);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 },
    );
  };

  const stopFollowUserLocation = () => {
    if (wathId.current) {
      Geolocation.clearWatch(wathId.current);
    }
  };

  return {
    haslocation,
    initialPosition,
    getCurrentLocation,
    followUser,
    currentUserPosition,
    stopFollowUserLocation,
    routeLines,
  };
};
