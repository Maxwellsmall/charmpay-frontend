import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import useApi from "@/hooks/useApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [passCode, setPassCode] = useState("");

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View className="w-full px-5">
          <Text className="text-[15px] font-semibold mt-[10px]">
            It’s a good idea to use a strong passcode you don’t use elsewhere.
          </Text>
        </View>
        <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
          Current Passcode
        </Text>
        <View className="px-4 py-2 mt-4 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
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
        <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
          New Passcode
        </Text>
        <View className="px-4 py-2 mt-4 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
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
        <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
          Confirm new passcode
        </Text>
        <View className="px-4 py-2 mt-4 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md flex-row justify-between items-center">
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
        <TouchableOpacity>
          <Text className="w-[90%] font-bold my-3 text-left text-[12px]">
            Forgot passcode?
          </Text>
        </TouchableOpacity>
        <View className=" bg-white">
          <TouchableOpacity className="bg-blue-900 w-96 mt-72 py-4 rounded-lg self-center">
            <Text className="text-white text-center font-semibold">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
