import { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  rootStyle,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import useApi from "@/hooks/useApi";
import { AuthContext } from "@/context/AuthProvider";

export default function Page() {
  const { userData, setUserData } = useContext(AuthContext);
  const { getProfile, editProfile } = useApi();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getProfile(setLoading);
    setUserData(response);
    setRefreshing(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = useCallback(() => {
    handleFetch();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-1 justify-start pt-10 items-center bg-white">
        <Text className="w-[90%] font-bold mb-5 text-left text-[12px] text-[#3A259C]">
          First Name
        </Text>
        <TextInput
          className="px-4 py-5 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md"
          placeholder={userData?.firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text className="w-[90%] font-bold my-5 text-left text-[12px] text-[#3A259C]">
          Last Name
        </Text>
        <TextInput
          className="px-4 py-5 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md"
          placeholder={userData?.lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <TouchableOpacity
          className="bg-blue-900 w-[90%] p-3 py-4 rounded-lg mt-8 flex-row justify-center items-center"
          onPress={() => editProfile(firstName, lastName, setLoading)}
          // onPress={() => router.navigate("/dashboard")}
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          <Text className="text-white text-center font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
