import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import successImg from "@/assets/images/success.png";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center bg-[#301B92]">
      <View className=" items-center">
        {/* <Ionicons name="shield-checkmark" size={140} color="#62D962" /> */}
        <Image source={successImg} />
        <Text className="text-white p-5 font-bold text-[24px]">
          Account Created Successfully
        </Text>
      </View>
      <TouchableOpacity
        className="bg-white absolute bottom-3 w-80 p-3 rounded-lg"
        onPress={() => router.navigate("/auth/signup/verify/")}
      >
        <Text className="text-blue-900 text-center font-semibold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
