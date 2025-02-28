import { View, Text, TextInput } from "react-native";
import React from "react";

export default function page() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <TextInput
        className="h-40 rounded-5 mb-10 border- py-10 w-40"
        placeholder="First name"
      />
    </View>
  );
}
