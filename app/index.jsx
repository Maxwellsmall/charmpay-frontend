import { View, Text, Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  setTimeout(() => {
    router.navigate("/screens/firstBoard");
  }, 4000);
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View>
        <Image source={require("../assets/images/logo.png")} />
        <Text className="text-center font-bold mt-5 text-lg">Charmpay</Text>
      </View>
    </View>
  );
}
