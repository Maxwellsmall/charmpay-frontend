import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className=" items-center">
        <Ionicons name="shield-checkmark" size={140} color="#62D962" />
        <Text className="text-green-500 p-5 font-bold">
          Account Created Successfully
        </Text>
      </View>
      <TouchableOpacity
        className="bg-blue-900 absolute bottom-3 w-80 p-3 rounded-lg"
        onPress={() => router.navigate("/auth/signup/verify/")}
      >
        <Text className="text-white text-center font-semibold">NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}
