import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LockScreen from '../screens/LockScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import MedsScreen from '../screens/MedsScreen';
import AIReaderScreen from '../screens/AIReaderScreen';
import TodayScreen from '../screens/TodayScreen';
import PetScreen from '../screens/PetScreen';
import FinanceScreen from '../screens/FinanceScreen';

export type RootStackParamList = {
  Lock: undefined;
  Onboarding: undefined;
  Home: undefined;
  Meds: undefined;
  AIReader: undefined;
  Today: undefined;
  Pet: undefined;
  Finance: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lock"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Lock" component={LockScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="Meds" component={MedsScreen} />
        <Stack.Screen name="AIReader" component={AIReaderScreen} />
        <Stack.Screen name="Today" component={TodayScreen} />
        <Stack.Screen name="Pet" component={PetScreen} />
        <Stack.Screen name="Finance" component={FinanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
