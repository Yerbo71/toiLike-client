import React from 'react';
import { router, Tabs } from 'expo-router';
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { styles } from './styles';

const Footer = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          paddingTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="myApplications/index"
        options={{
          title: 'Applications',
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ordering/index"
        options={{
          title: 'Order',
          tabBarIcon: () => (
            <View style={styles.fabContainer}>
              <FAB
                icon="plus"
                color="white"
                style={styles.fab}
                onPress={() => {
                  router.push('/(application)/ordering');
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chats/index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="details/[id]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default Footer;
