import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import profileImage from "@/assets/images/OIP.png";
import { Ionicons } from "@expo/vector-icons";
import useApi from "@/hooks/useApi";

export default function RecipientModal({
  setIsVisible,
  isVisible,
  setRecipient,
}) {
  const { fetchAllBeneficiary } = useApi;
  const [beneficiaries, setBeneficiaries] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBeneficiary = async () => {
      let response = fetchAllBeneficiary(setLoading);
      setBeneficiaries(response);
    };
    fetchBeneficiary();
  }, []);
  const handleSetRecipient = (recipient) => {
    setRecipient(recipient);
    setIsVisible(false);
  };
  return (
    <Modal visible={isVisible} animationType="slide">
      <Header
        title="Select Recipient"
        isModal={true}
        setIsVisible={setIsVisible}
      />
      <ScrollView className="px-5">
        <View className="mb-3">
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter recipient email"
            keyboardType="email-address"
            returnKeyType="search"
            // onChangeText={(text) => setFirstName(text)}
          />
        </View>
        {/* Search user */}
        <View className="mb-5">
          <TouchableOpacity
            className="flex-row justify-normal items-center"
            onPress={() => handleSetRecipient({})} // recipient user object
          >
            <Image source={profileImage} className="rounded-full w-[40px]" />
            <View className="ml-3">
              <Text className="text-bold font-bold">Chukwuchebem David</Text>
              <Text className="text-[#616060] font-semibold text-[10px]">
                daviddominic767@gmail.com
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Beneficiary list */}
        <View>
          <Text className="text-[20px] font-medium">Beneficiary</Text>
          <View className="mt-5">
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="flex-row justify-normal items-center"
                onPress={() => handleSetRecipient({})} // recipient user object
              >
                <Image
                  source={profileImage}
                  className="rounded-full w-[40px]"
                />
                <View className="ml-3">
                  <Text className="text-bold font-bold">
                    Chukwuchebem David
                  </Text>
                  <Text className="text-[#616060] font-semibold text-[10px]">
                    daviddominic767@gmail.com
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
