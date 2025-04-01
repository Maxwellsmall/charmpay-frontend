import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthProvider";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <View>
      <View className="flex-row items-center">
        <Image source={require("@/assets/images/Charmpay_Bot.png")} />
        <View>
          <Text className="font-bold">Hi {userData?.firstName}</Text>
          <Text className="font-bold">How can we hwlp you today?</Text>
        </View>
      </View>
      <View>
        <TextInput
          className="px-4 py-5 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md self-center"
          placeholder="Search"
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View className="flex-row justify-between items-center mx-4 mt-10">
        <TouchableOpacity className="pl-3">
          <View className="">
            <View className="flex-row items-center">
              <Ionicons name="document-outline" size={25} />
              <Text className="text-bold font-bold ml-3">
                Transfer Disputes
              </Text>
            </View>
            <Text className="text-[#b8b5b5] font-semibold text-[13px] mt-2">
              Tap to report scam or restrict your account
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mx-4 mt-10">
        <TouchableOpacity className="pl-3">
          <View className="">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle-outline" size={25} />
              <Text className="text-bold font-bold ml-3">Report Scam</Text>
            </View>
            <Text className="text-[#b8b5b5] font-semibold text-[13px] mt-2">
              Tap to report scam or restrict your account
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mx-4 mt-10">
        <TouchableOpacity className="pl-3">
          <View className="">
            <View className="flex-row items-center">
              <Feather name="arrow-up-right" size={25} />
              <Text className="text-bold font-bold ml-3">
                Report Transfer Error
              </Text>
            </View>
            <Text className="text-[#b8b5b5] font-semibold text-[13px] mt-2">
              Tap to report scam or restrict your account
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mx-4 mt-10">
        <TouchableOpacity className="pl-3">
          <View className="">
            <View className="flex-row items-center">
              <Ionicons name="shield-checkmark-outline" size={25} />
              <Text className="text-bold font-bold ml-3">Security Check</Text>
            </View>
            <Text className="text-[#b8b5b5] font-semibold text-[13px] mt-2">
              Tap to report scam or restrict your account
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
