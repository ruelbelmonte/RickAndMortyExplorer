import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/HomeScreen';
import CharacterDetails from '../components/CharacterDetails';
import { Character } from '../types/characterTypes';

export type RootStackParamList = {
  Home: undefined;
  CharacterDetails: { character: Character };
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;