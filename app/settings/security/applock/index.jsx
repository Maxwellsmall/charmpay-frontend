import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Page() {
  const [toggle, setToggle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 mt-[20px]">
          <View>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">
                  Allow Data Sharing With Third Parties
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle" size={25} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">
                  Personalized Recommendations
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="circle" size={25} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">
                  Anonymous Usage Statistic
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle" size={25} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">
                  Opt-out of Promotional Emails
                </Text>
              </View>
              <Ionicons name="chevron-down" size={24} />
            </TouchableOpacity>
          </View>
          <View className="py-7">
            <Text className="w-[90%] font-bold my-5 text-left text-[15px]">
              Biometric Login Option
            </Text>
            <View className="px-4 py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[100%] rounded-md flex-row justify-between items-center">
              <Text> Login With Biometric</Text>

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <MaterialIcons name="toggle-on" size={40} color={"blue"} />
                ) : (
                  <MaterialIcons name="toggle-off" size={40} color={"grey"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
