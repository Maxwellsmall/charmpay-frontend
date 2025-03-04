import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function page() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View>
        <TextInput
          className="h-10 px-4 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-80 rounded-md"
          placeholder="First Name"
        />
        <TextInput
          className="h-10 px-5 bg-[#F5F5F5] mt-5  w-80 rounded-md"
          placeholder="Last name"
        />
        <TextInput
          className="h-10 px-5 bg-[#F5F5F5] mt-5  w-80 rounded-md"
          placeholder="Email"
        />
        <TextInput
          keyboardType="number-pad"
          className="h-10 px-5 bg-[#F5F5F5] mt-5  w-80 rounded-md"
          placeholder="Number"
        />
      </View>
      <TouchableOpacity
        className="bg-blue-900 mt-96  w-80 p-3 rounded-lg"
        onPress={() => router.navigate("/auth/signup/otp/")}
      >
        <Text className="text-white text-center font-semibold">NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}
