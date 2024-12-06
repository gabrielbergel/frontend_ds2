import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UserRegistrationScreen from './src/screens/UserRegistrationScreen';
import PontoRegistrationScreen from './src/screens/PontoRegistrationScreen';
import AllPontosScreen from './src/screens/AllPontosScreen'
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />
        <Stack.Screen name="PontoRegistration" component={PontoRegistrationScreen} />
        <Stack.Screen name="AllPontos" component={AllPontosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
