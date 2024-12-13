import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './screens/UserListScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import { enableScreens } from 'react-native-screens';


enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'User Directory' }} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
