import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View className=" p-20">
      <Text className=" font-pblack">Indexxx</Text>
      <StatusBar></StatusBar>
      <Link href="/home">go to home</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
