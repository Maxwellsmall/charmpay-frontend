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
            <TouchableOpacity className="flex-row py-5 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">System Default</Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle" size={25} color={"blue"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-5 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">Light Mode</Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <MaterialIcons name="circle" size={25} color={"blue"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="flex-row py-5 items-center justify-between border-b-2 border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-[15px] font-bold">Dark Mode</Text>
              </View>
              {toggle ? (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle-thin" size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setToggle(!toggle)}>
                  <FontAwesome name="circle" size={25} color={"blue"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
