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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import useApi from "@/hooks/useApi";

export default function Page() {
  const [toggle, setToggle] = useState(false);
  const { getProfile, enableTwoFactorAuth } = useApi();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const handleFetch = async () => {
      const response = await getProfile(setLoading);
      setUserProfile(response);
    };
    handleFetch();
  }, []);

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
          <View className="flex-row items-center">
            {!userProfile?.avatar ? (
              <Ionicons name="person-circle" size={140} />
            ) : (
              <Image
                source={profileImage}
                className="rounded-full w-[148px] h-[148px]"
                resizeMode="cover"
              />
            )}
            <TouchableOpacity className="ml-[-50px] mt-[70px] bg-white rounded-full p-1">
              <Ionicons name="pencil-outline" size={20} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-baseline mb-3">
            <Text className="text-[24px] font-bold mt-[10px]">
              {userProfile?.firstName} {userProfile?.lastName}
            </Text>
          </View>
          <View className="justify-between items-center mb-2">
            <Text className="text-[14px] text-neutral-400">
              {userProfile?.email}
            </Text>
          </View>
          <View className=" justify-between items-center mb-5">
            <Text className="text-[14px] text-neutral-400">
              {userProfile?.phoneNumber}
            </Text>
          </View>
          <TouchableOpacity
            className="ml-2 bg-gray-300 w-40 py-4 rounded-lg text-center"
            onPress={() => router.navigate("/settings/profile/edit")}
          >
            <Text className="text-[14px] text-center font-semibold">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="settings-outline" size={24} />
              </View>
              <Text className="text-[15px] font-bold">
                Two Factor Authentication
              </Text>
            </View>
            {toggle ? (
              <TouchableOpacity
                onPress={() => {
                  setToggle(!toggle);
                  enableTwoFactorAuth(true, setLoading);
                }}
              >
                <MaterialIcons name="toggle-on" size={45} color={"green"} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  enableTwoFactorAuth(false, setLoading);
                  setToggle(!toggle);
                }}
              >
                <MaterialIcons name="toggle-off" size={45} color={"grey"} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TouchableOpacity className="flex-row py-3 items-center justify-between border-b-2 border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                <Ionicons name="settings-outline" size={24} />
              </View>
              <Text className="text-[15px] font-bold">KYC Verification</Text>
            </View>
            <View className=" flex-row items-center">
              <Text className="text-[15px] text-green-500 font-semibold">
                Verified
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
