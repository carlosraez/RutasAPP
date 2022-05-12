import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { PermissionsContext } from '../context/permissionscontext';

export const PermissionsScreen = () => {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={sytles.container}>
      <Text>Permissions Screen</Text>
      <Button title="Permission GPS" onPress={askLocationPermission} />
      <Text style={{ marginTop: 30 }}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
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
