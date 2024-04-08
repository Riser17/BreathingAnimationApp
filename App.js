import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Text,
  Pressable,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const circleWidth = width / 2;

function App() {
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const [isPlaying, setIsPlaying] = useState(true);
  const [pausedValue, setPausedValue] = useState(0);

  const startAnimation = () => {
    setIsPlaying(true);
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            delay: 1000,
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: 1000,
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start(({finished}) => {
      if (finished) {
        setPausedValue(move._value);
      }
    });
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            delay: 1000,
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: 1000,
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).stop();
    setPausedValue(move._value);
  };

  const playButtonPressed = () => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      startAnimation();
    }
  };

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [pausedValue * (circleWidth / 6), circleWidth / 6],
  });

  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: textOpacity,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}>
          Inhale
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          width: circleWidth,
          height: circleWidth,
          ...StyleSheet.absoluteFill,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: exhale,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}>
          Exhale
        </Text>
      </Animated.View>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
        const rotation = move.interpolate({
          inputRange: [0, 1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });
        return (
          <Animated.View
            key={item}
            style={{
              opacity: 0.1,
              backgroundColor: 'purple',
              width: circleWidth,
              height: circleWidth,
              borderRadius: circleWidth / 2,
              ...StyleSheet.absoluteFill,
              transform: [
                {
                  rotateZ: rotation,
                },
                {translateX: translate},
                {translateY: translate},
              ],
            }}></Animated.View>
        );
      })}
      <Pressable
        onPress={playButtonPressed}
        style={{
          right: width / 4,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isPlaying ? 'pink' : 'lightblue',
          padding: 14,
          width: 100,
          height: 50,
          borderRadius: 30,
          borderLeftWidth: isPlaying ? 4 : 0,
          borderBottomWidth: isPlaying ? 3 : 0,
          borderColor: '#C0C0C0',
        }}>
        <Text>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    left: width / 4,
    top: height / 4,
  },
});

export default App;
