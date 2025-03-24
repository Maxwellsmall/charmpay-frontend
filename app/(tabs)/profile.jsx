import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useApi from "@/hooks/useApi";

export default function profile() {
  const { getProfile, logout } = useApi;
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const handleFetch = async () => {
      const response = await getProfile(setLoading);
      setUserProfile(response);
    };
    handleFetch();
  }, []);

  const handleLogout = () => {
    console.log("hu");
    Alert.alert("Loggout?", "Are you sure you want to logout?", [
      {
        text: "CANCEL",
        onPress: () => {
          return;
        },
      },
      {
        text: "LOGOUT",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
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
        <View className="justify-center items-center mt-[50px]">
          <Image
            source={profileImage}
            className="rounded-full w-[148px] h-[148px]"
            resizeMode="cover"
          />
          <Text className="text-[24px] font-bold mt-[10px]">
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
          <Text className="text-[11px] text-[#1E1E1E] mt-[5px]">
            Personal Account
          </Text>
        </View>
        <View className="px-5 mt-[20px]">
          <TouchableOpacity
            className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
            onPress={() => router.navigate("/settings/")}
          >
            <View className="flex-row items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="settings-outline" size={24} />
              </View>
              <Text className="text-[20px]">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="lock-closed-outline" size={24} />
              </View>
              <Text className="text-[20px]">Privacy and Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
            onPress={() => router.navigate("/settings/help")}
          >
            <View className="flex-row items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="help-circle-outline" size={24} />
              </View>
              <Text className="text-[20px]">Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row py-3 items-center border-b-2 border-gray-200"
            onPress={handleLogout}
          >
            <View className="bg-[#FCE8EA] p-3 rounded-full me-3">
              <Ionicons name="exit-outline" size={24} color={"red"} />
            </View>
            <Text className="text-[20px] text-[red]">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
