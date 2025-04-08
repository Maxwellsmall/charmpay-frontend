import React, { useEffect, useRef } from "react";
import { View, Animated, ScrollView, RefreshControl } from "react-native";

const Skeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const shimmerInterpolation = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E0E0E0", "#F5F5F5"],
  });

  return (
    <ScrollView
      className="bg-white"
      refreshControl={<RefreshControl refreshing={true} />}
    >
      <View className="mx-5 mt-2">
        {/* Total Balance Skeleton */}
        <View>
          <Animated.View
            style={{
              width: 120,
              height: 20,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
              marginBottom: 10,
            }}
          />
          <Animated.View
            style={{
              width: 180,
              height: 35,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
            }}
          />
        </View>

        {/* Buttons Skeleton */}
        <View className="flex-row items-center justify-evenly mt-[15px]">
          {[...Array(3)].map((_, index) => (
            <Animated.View
              key={index}
              style={{
                width: 100,
                height: 40,
                borderRadius: 25,
                backgroundColor: shimmerInterpolation,
              }}
            />
          ))}
        </View>

        {/* Invite Card Skeleton */}
        <Animated.View
          style={{
            width: "90%",
            height: 100,
            borderRadius: 20,
            backgroundColor: shimmerInterpolation,
            marginTop: 30,
            alignSelf: "center",
          }}
        />

        {/* Transactions Title Skeleton */}
        <View className="mt-[20px] flex-row items-center justify-between">
          <Animated.View
            style={{
              width: 150,
              height: 25,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
            }}
          />
          <Animated.View
            style={{
              width: 80,
              height: 20,
              borderRadius: 5,
              backgroundColor: shimmerInterpolation,
            }}
          />
        </View>

        {/* Transactions List Skeleton */}
        <View className="mt-[10px]">
          {[...Array(3)].map((_, index) => (
            <Animated.View
              key={index}
              style={{
                width: "100%",
                height: 60,
                borderRadius: 10,
                backgroundColor: shimmerInterpolation,
                marginVertical: 5,
              }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Skeleton;
