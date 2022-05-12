import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export const PermissionsScreen = () => {
  let permissionStatus: PermissionStatus;
  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    console.log({ permissionStatus });
  };

  return (
    <View style={sytles.container}>
      <Text>Permissions Screen</Text>
      <Button title="Permission GPS" onPress={checkLocationPermission} />
    </View>
  );
};

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
