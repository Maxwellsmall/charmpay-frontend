import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useApi from "@/hooks/useApi";
import { AuthContext } from "@/context/AuthProvider";

export default function Page() {
  const { logout } = useApi();
  const { setUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleClearCache = () => {
    console.log("hu");
    Alert.alert(
      "Clear Cache?",
      "Are you sure you want to clear app cache?, You will be logged out.",
      [
        {
          text: "CANCEL",
          onPress: () => {
            return;
          },
        },
        {
          text: "CLEAR",
          style: "destructive",
          onPress: () => {
            logout(setUserData);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 mt-[20px]">
          <View>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => {
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                );
              }}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Language</Text>
              </View>
              <Ionicons name="chevron-down" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() => {
                // router.navigate("settings/perfer/theme")
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                );
              }}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Theme</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={() =>
                Alert.alert("Charmpay Inc", "This is Charmpay 2.0.0.")
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">App Version Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              onPress={handleClearCache}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[20px] font-bold">Clear Cache</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
