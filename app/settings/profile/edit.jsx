import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import useApi from "@/hooks/useApi";

const Page = () => {
  const { editProfile, getProfile } = useApi;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const handleFetch = async () => {
    setRefreshing(true);
    const response = await getProfile(setLoading);
    setUserProfile(response);
    setRefreshing(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = useCallback(() => {
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
          placeholder={userProfile?.firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text className="w-[90%] font-bold my-5 text-left text-[12px] text-[#3A259C]">
          Last Name
        </Text>
        <TextInput
          className="px-4 py-5 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[90%] rounded-md"
          placeholder={userProfile?.lastName}
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
};

export default Page;
const styles = StyleSheet.create({
  codeFieldRoot: {
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  focusCell: {
    borderColor: "#5A67D8",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
