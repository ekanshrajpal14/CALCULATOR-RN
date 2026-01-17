import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamsList, 'splash'>;

const SplashScreen = (props: Props) => {
  setTimeout(() => {
    props.navigation.replace('home');
  }, 2000);

  return (
    <View style={styles.main}>
      <View>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#277bab',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default SplashScreen;
