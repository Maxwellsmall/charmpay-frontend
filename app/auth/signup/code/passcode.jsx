import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useApi from "@/hooks/Api";

const CELL_COUNT = 6; // Number of digits in the passcode

const Page = () => {
  const { storePasscode } = useApi;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passCode, setPassCode] = useState("");
  const [confirmPassCode, setConfirmPassCode] = useState("");
  return (
    <View className="flex-1 items-center bg-white pt-[20px]">
      <Text className="w-[90%] font-medium mb-2 text-left text-[22px] font-semibold">
        Create a Strong Passcode
      </Text>
      <Text className="w-[90%] font-medium mb-10 text-left text-[12px] text-neutral-600">
        Create a password you will always remember
      </Text>

      <Text className="w-[90%] font-bold my-5 text-left text-[15px] text-[#3A259C]">
        New Passcode
      </Text>
      <View className="px-4 py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
        <TextInput
          className="placeholderTextColor-[#F5F5F5] w-[50%] "
          placeholder="Passcode"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassCode(text)}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Ionicons name="eye" size={20} />
          ) : (
            <Ionicons name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <Text className="w-[90%] font-bold my-5 text-left text-[12px] text-[#3A259C]">
        Confirm New Passcode
      </Text>
      <View className="px-4 py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
        <TextInput
          className="placeholderTextColor-[#F5F5F5] w-[50%] "
          placeholder="Passcode"
          secureTextEntry={!showConfirmPassword}
          onChangeText={(text) => setConfirmPassCode(text)}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <Ionicons name="eye" size={20} />
          ) : (
            <Ionicons name="eye-off" size={20} />
          )}
        </TouchableOpacity>
      </View>
      {/* Next Button */}
      <TouchableOpacity
        className="bg-blue-900 absolute bottom-3 w-96 p-3 rounded-lg"
        onPress={() => storePasscode(passCode, confirmPassCode)}
      >
        <Text className="text-white text-center font-semibold">NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  codeFieldRoot: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
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
