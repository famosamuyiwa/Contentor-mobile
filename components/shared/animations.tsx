import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const FadeInViewToggled = (props:any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.isVisible) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    }
  }, [props.isVisible, fadeAnim]);
  
  // Render null if not visible
  if (!props.isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        opacity: fadeAnim.interpolate({ // Interpolate opacity based on the fadeAnim value
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      }}
    >
      {/* Render children */}
      {props.children}
    </Animated.View>
  );
};

export {
  FadeInViewToggled
} ;
