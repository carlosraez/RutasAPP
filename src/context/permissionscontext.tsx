import React, { createContext, useState, useEffect } from 'react';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';
import { Platform, AppState } from 'react-native';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

//initial State
export const PermissionsInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {
  let permissionStatus: PermissionStatus;
  const [permissions, setPermissions] = useState(PermissionsInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    if (Platform.OS === 'ios') {
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissionStatus === 'blocked') {
      openSettings();
    }
    //destructuring all permissions from state
    setPermissions({ ...permissions, locationStatus: permissionStatus });
  };
  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({ ...permissions, locationStatus: permissionStatus });
  };

  return (
    <PermissionsContext.Provider
      value={{ permissions, askLocationPermission, checkLocationPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};
