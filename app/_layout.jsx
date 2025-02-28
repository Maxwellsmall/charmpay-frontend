import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "react-native";
import { View, Image, Text } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <Image
                  source={require("../assets/images/logo.png")}
                  className="w-12 h-12 mr-3"
                />
                <Text className="font-bold">Charmpay</Text>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
}
