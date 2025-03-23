import { useState, useEffect, useContext } from "react";
import { useRouter, Stack } from "expo-router";
import "../global.css";
import { ActivityIndicator, StatusBar } from "react-native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import AuthProvider from "@/context/AuthProvider";
import { AuthContext } from "@/context/AuthProvider";
export default function Layout() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  return (
    <AuthProvider>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="auth/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="screens/firstBoard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/secondBoard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/signup/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/signup/code/transactionCode"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/signup/code/passcode"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/signup/verify/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/signup/verify/success"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth/login/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 48, height: 48, marginRight: 12 }}
                />
                <Text style={{ fontWeight: "bold" }}>Charmpay</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="settings/help/index"
          options={{
            header: () => <Header title="Help Center" />,
            headerShadowVisible: false,
            headerShown: true,
            contentStyle: {
              backgroundColor: "white",
            },
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="settings/index"
          options={{
            header: () => <Header title="Settings" />,
            headerShadowVisible: false,
            headerShown: true,
            contentStyle: {
              backgroundColor: "white",
            },
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="dashboard/profile/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "white" },
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <Text className="font-bold ms-[10px] text-BLACK">
                  Edit profile
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="settings/settings"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "white" },
            headerTitleAlign: "center",
            headerTitle: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity className=" p-2 rounded-sm">
                  <Image
                    source={require("../assets/images/OIP.png")}
                    className="w-14 rounded-full"
                  />
                </TouchableOpacity>
                <Text className="font-bold ms-[10px] text-BLACK">
                  HI, IBEH PROMISE
                </Text>
              </View>
            ),
            headerRight: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={() => router.navigate("/settings")}>
                  <Ionicons name="settings-outline" size={24} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="auth/transaction/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "white" },
            headerLeft: () => (
              <View className="flex-row justify-center items-center">
                <TouchableOpacity>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <Text className="font-bold ms-[10px] text-BLACK">
                  Transaction History
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="tasks/index"
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="tasks/create"
          options={{
            header: () => <Header title="Create Task" />,
            headerShadowVisible: false,
            headerShown: true,
            contentStyle: {
              backgroundColor: "white",
            },
          }}
        />
        <Stack.Screen
          name="tasks/success"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="funding/index"
          options={{
            header: () => <Header title="add money" />,
            headerShadowVisible: false,
            headerShown: true,
            headerLeft: () => <Text>Hello world</Text>,
            contentStyle: {
              backgroundColor: "white",
            },
          }}
        />
        <Stack.Screen
          name="dashboard/notifications"
          options={{
            header: () => (
              <Header title="Notifications" isNotification={true} />
            ),
            headerShadowVisible: false,
            headerShown: true,
            contentStyle: {
              backgroundColor: "white",
            },
          }}
        />
        <Stack.Screen
          name="dashboard/taskDetails/index"
          options={{
            header: () => <Header title="Task Details" />,
            headerShadowVisible: false,
            headerShown: true,
            contentStyle: {
              backgroundColor: "white",
            },
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
