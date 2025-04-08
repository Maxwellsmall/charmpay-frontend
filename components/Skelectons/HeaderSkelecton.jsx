import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const HeaderSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const shimmerInterpolation = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E0E0E0", "#F5F5F5"], // Light shimmer effect
  });

  return (
    <View className="flex-row justify-between items-center px-5 py-3 bg-white">
      {/* Left Side (Profile Info) */}
      <View className="flex-row justify-normal items-center">
        {/* Profile Image Skeleton */}
        <Animated.View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: shimmerInterpolation,
          }}
        />
        {/* Text Skeleton */}
        <View className="ml-3">
          <Animated.View
            style={{
              width: 100,
              height: 20,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
              marginBottom: 5,
            }}
          />
          <Animated.View
            style={{
              width: 80,
              height: 15,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
            }}
          />
        </View>
      </View>

      {/* Right Side (Notification Icon Skeleton) */}
      <Animated.View
        style={{
          width: 35,
          height: 35,
          borderRadius: 17.5,
          backgroundColor: shimmerInterpolation,
        }}
      />
    </View>
  );
};

export default HeaderSkeleton;
