import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import PostsScreen from '../screens/PostsScreen';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Posts') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarItemStyle: styles.tabBarItemStyle,
      })}
    >
      <Tab.Screen 
        name="Posts" 
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => {
               // Handle logout logic here
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen 
        name="Create" 
        component={CreatePostsScreen}
        options={{
          tabBarLabel: 'Create Post',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }}
    />
    <AuthStack.Screen 
      name="Registration" 
      component={RegistrationScreen} 
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarItemStyle: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
});

export default AppNavigator;