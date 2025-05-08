import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useApi from "@/hooks/useApi";

export default function Page() {
  const { enableEmailNotification } = useApi();
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 mt-[20px]">
          <View>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              // onPress={() => router.navigate("settings/notices/email")}
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Email Notifications
                </Text>
              </View>
              {toggle ? (
                <TouchableOpacity
                  onPress={() => {
                    setToggle(!toggle);
                    enableEmailNotification(true, setLoading);
                  }}
                >
                  <MaterialIcons name="toggle-on" size={45} color={"blue"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setToggle(!toggle);
                    enableEmailNotification(false, setLoading);
                  }}
                >
                  <MaterialIcons name="toggle-off" size={45} color={"grey"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              // onPress={() => router.navigate("settings/notices/push")}
              onPress={() =>
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Push Notifications
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              // onPress={() => router.navigate("settings/notices/sms")}
              onPress={() =>
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">SMS Alerts</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              // onPress={() => router.navigate("settings/notices/transaction")}
              onPress={() =>
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Transactions Updates
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row py-3 items-center justify-between border-b-2 border-gray-200"
              // onPress={() => router.navigate("settings/notices/dispute")}
              onPress={() =>
                Alert.alert(
                  "Charmpay Inc",
                  "This feature is not yet avaialble."
                )
              }
            >
              <View className="flex-row items-center">
                <View className="bg-[#f5f5f5] p-3 rounded-full me-3">
                  <Ionicons name="settings-outline" size={24} />
                </View>
                <Text className="text-[15px] font-bold">
                  Dispute Notifications
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
