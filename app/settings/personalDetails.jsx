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

export default function Page() {
  const { getProfile, logout } = useApi();
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
            <TouchableOpacity className="ml-[-50px] mt-[100px] bg-slate-200 rounded-full p-1">
              <Ionicons name="camera" size={20} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-baseline mb-10">
            <Text className="text-[24px] font-bold mt-[10px]">
              {userProfile?.firstName} {userProfile?.lastName}
            </Text>
            <TouchableOpacity
              className="ml-2"
              onPress={() => router.navigate("/settings/profile/edit")}
            >
              <Ionicons name="create-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-7 mt-[20px]">
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">Phone Number</Text>
            <Text className="font-semibold">{userProfile.phoneNumber}</Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">Email</Text>
            <Text className="font-semibold">{userProfile.email}</Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">FirstName</Text>
            <Text className="font-semibold">{userProfile.firstName}</Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-5">
            <Text className="text-[14px] text-neutral-400">LastName</Text>
            <Text className="font-semibold">{userProfile.lastName}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
