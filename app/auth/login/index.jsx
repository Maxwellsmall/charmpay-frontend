import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  rootStyle,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import useApi from "@/hooks/useApi";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { login } = useApi();
  const [email, setEmail] = useState("");
  const [passCode, setPassCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApis = async () => {
    await login(email, passCode, setLoading);
  };
  return (
    <View className="flex-1 justify-start pt-10 items-center bg-white">
      <Text className="w-[90%] font-bold mb-5 text-left text-[29px]">
        Welcome back
      </Text>
      <Text className="w-[90%] font-medium mb-16 text-left text-[12px]">
        Login into your account
      </Text>

      <Text className="w-[90%] font-bold mb-5 text-left text-[12px] text-[#3A259C]">
        Email
      </Text>
      <TextInput
        className="px-4 py-5 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md"
        placeholder="Email Address"
        onChangeText={(text) => setEmail(text)}
      />
      <Text className="w-[90%] font-bold my-5 text-left text-[12px] text-[#3A259C]">
        Passcode
      </Text>
      <View className="px-4 py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
        <TextInput
          className="placeholderTextColor-[#F5F5F5] w-[50%] "
          placeholder="Passcode"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassCode(text)}
          keyboardType="number-pad"
          maxLength={6}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Ionicons name="eye" size={20} />
          ) : (
            <Ionicons name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-blue-900 w-[90%] p-3 py-4 rounded-lg mt-8 flex-row justify-center items-center"
        onPress={handleApis}
        // onPress={() => router.navigate("/dashboard")}
      >
        {loading && <ActivityIndicator size={24} color={"white"} />}
        <Text className="text-white text-center font-semibold">LOGIN</Text>
      </TouchableOpacity>

      <Text className="w-[90%] font-bold mt-5 text-[12px] text-center text-[#3A259C]">
        Forgotten Password?
      </Text>
    </View>
  );
};

export default Page;
const styles = StyleSheet.create({
  codeFieldRoot: {
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  focusCell: {
    borderColor: "#5A67D8",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
