import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import imagePicker from "expo-image-picker";
import { useState } from "react";

export default function Page() {
  const [image, setImage] = "";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="p-16 items-center flex-1 bg-[#F2F2F2]">
      <View className="justify-center items-center">
        <View>
          <TouchableOpacity onPress={pickImage}>
            <Text>Pick an image from camera roll</Text>
            {image && <Image source={{ uri: image }} />}
          </TouchableOpacity>
        </View>
        <View className="bg-white mt-20 w-96 p-14 rounded-xl elevation-lg shadow-slate-950">
          <View className="flex flex-col gap-4">
            <View className="flex-row">
              <Text className="text-lg text-black">Full name</Text>
              <View className="ml-20">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black">Maxwell Edunfunke</Text>
                  <Ionicons name="pencil" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-black text-lg">Mobile Number</Text>
              <View className="ml-14">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black">+2347068383089</Text>
                  <Ionicons name="pencil" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-black text-lg">Email</Text>
              <View className="ml-28">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black">d*****8@gmail.com</Text>
                  <Ionicons name="pencil" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row">
              <Text className="text-black text-lg">Date of Birth</Text>
              <View className="ml-36">
                <Text>**_**_14</Text>
              </View>
            </View>

            <View className="flex-row">
              <Text className="text-black text-lg">Nick Name</Text>
              <View className="ml-28">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black">Maxwellsmall</Text>
                  <Ionicons name="pencil" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white mt-10 w-96 p-10 rounded-xl elevation-lg shadow-slate-950">
          <View className="flex flex-col gap-6">
            <View className="flex-row">
              <Text className="text-black text-lg">Account Number</Text>
              <View className="ml-14">
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center"
                >
                  <Text className="text-black ml-20">7068383089</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center">
              <Text className="text-black text-lg">Account Tier</Text>
              <View className="ml-32 flex-row items-center">
                <Text className="">Tier 1</Text>
                <TouchableOpacity
                  // onPress={() => navigation.navigate("LoginSettings")}
                  className="flex-row items-center bg-blue-900 w-20 p-2 justify-center rounded-lg"
                >
                  <Text className="text-white font-semibold">Upgrade</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
