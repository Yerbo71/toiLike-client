import React from 'react';
import { router, Tabs } from 'expo-router';
import {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

const ApplicationLayout = () => {
  return (
    <Tabs>
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
                style={styles.fab}
                color="white"
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
    </Tabs>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -35,
    height: 60,
    width: 60,
  },
  fab: {
    backgroundColor: Colors.light.primary,
  },
});

export default ApplicationLayout;
