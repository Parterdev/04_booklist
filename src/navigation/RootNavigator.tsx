import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AddBookScreen, ListScreen} from '../screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="AddBook" component={AddBookScreen} />
    </Stack.Navigator>
  );
}