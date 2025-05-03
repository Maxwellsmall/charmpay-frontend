import {
  View,
  Text,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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
  setIsBeneficiary,
}) {
  const { fetchAllBeneficiary, getUserByEmail } = useApi();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  // Fetch beneficiaries when modal opens
  useEffect(() => {
    if (isVisible) {
      const fetchBeneficiary = async () => {
        setLoading(true);
        try {
          const response = await fetchAllBeneficiary(setLoading);
          setBeneficiaries(response || []);
        } catch (error) {
          console.error("Error fetching beneficiaries:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBeneficiary();
    }
  }, [isVisible]);

  const handleSetRecipient = (recipient, isBeneficiary) => {
    setRecipient(recipient);
    setIsVisible(false);
    setIsBeneficiary(isBeneficiary);
  };

  const handleSearch = async (text) => {
    setEmail(text);
    setErrorMessage("");
    setSearchResult(null);

    if (text.trim() === "") return;

    const result = await getUserByEmail(text, setLoading, setErrorMessage);

    if (result) {
      setSearchResult(result);
    }
  };

  const BeneficiaryItem = ({ recipient }) => (
    <View className="flex-row justify-between items-center my-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => handleSetRecipient(recipient, true)}
      >
        <Image
          source={profileImage}
          className="rounded-full w-[40px] h-[40px]"
        />
        <View className="ml-3">
          <Text className="font-bold">
            {recipient?.beneficiaryUser.firstName}{" "}
            {recipient?.beneficiaryUser.lastName}
          </Text>
          <Text className="text-[#616060] font-semibold text-[10px]">
            {recipient?.beneficiaryUser.email}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} />
      </TouchableOpacity> */}
    </View>
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <Header
        title="Select Recipient"
        isModal={true}
        setIsVisible={setIsVisible}
      />
      <View className="px-5">
        {/* Search Input */}
        <View className="mb-3">
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter recipient email"
            keyboardType="email-address"
            returnKeyType="search"
            value={email}
            onChangeText={handleSearch}
          />
        </View>

        {/* Show Loading */}
        {loading && <ActivityIndicator size="small" color="#000" />}

        {/* Show Search Result */}
        {searchResult && (
          <View className="mb-5">
            <TouchableOpacity
              className="flex-row items-center p-2 py-7 bg-white rounded-lg elevation-md"
              onPress={() => handleSetRecipient(searchResult, false)}
            >
              <Image
                source={profileImage}
                className="rounded-full w-[40px] h-[40px]"
              />
              <View className="ml-3">
                <Text className="font-bold">
                  {searchResult.firstName} {searchResult.lastName}
                </Text>
                <Text className="text-[#616060] font-semibold text-[10px]">
                  {searchResult.email}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Show Error Message */}
        {errorMessage !== "" && (
          <Text className="text-red-500">{errorMessage}</Text>
        )}

        {/* Beneficiary List */}
        <View>
          <Text className="text-[20px] font-medium mb-3">Beneficiary</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={beneficiaries}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <BeneficiaryItem recipient={item} />}
              ListEmptyComponent={<Text>No beneficiaries found</Text>}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
