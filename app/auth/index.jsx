import { View, Text, TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View>
        <TouchableOpacity
          className="bg-blue-900 mt-4 w-80 p-3 rounded-lg"
          onPress={() => router.navigate("./auth/login/")}
        >
          <Text className="text-white text-center font-semibold">LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#F5F5F5] mt-4 w-80 p-3 rounded-lg"
          onPress={() => router.navigate("./auth/signup/")}
        >
          <Text className="text-black text-center font-semibold">SIGNUP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="flex-row justify-center items-center mt-60 absolute bottom-20 bg-[#F5F5F5] p-3 px-3 rounded-[25px]">
        <Fontisto name="world-o" size={15} color="blue" />
        <Text className="ms-[13px] text-blue-700 text-xs">ENGLISH</Text>
      </TouchableOpacity>
      <Text className="mt-60 absolute bottom-9 text-blue-900 font-bold">
        Continue to agree to privacy policy
      </Text>
    </View>
  );
}
