import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FontAwesome } from "@expo/vector-icons";
import useApi from "@/hooks/useApi";

export default function RecipientModal({
  setIsVisible,
  isVisible,
  setRecipient,
}) {
  const { getAllBanks } = useApi();
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch banks when modal opens
  useEffect(() => {
    if (isVisible) {
      const fetchBanks = async () => {
        setLoading(true);
        try {
          const response = await getAllBanks(setLoading);
          setBanks(response || []);
          setFilteredBanks(response || []); // ✅ Initialize filteredBanks
        } catch (error) {
          console.error("Error fetching banks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBanks();
    }
  }, [isVisible]);

  const handleSetRecipient = (recipient) => {
    setRecipient(recipient);
    setIsVisible(false);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);

    if (text.trim() === "") {
      setFilteredBanks(banks); // Show all if search is cleared
      return;
    }

    const filtered = banks.filter((bank) =>
      bank.name?.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredBanks(filtered);
  };

  const BanksItem = ({ recipient }) => (
    <View className="flex-row justify-between items-center my-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => handleSetRecipient(recipient, true)}
      >
        <View className="bg-white p-1 rounded-full">
          <FontAwesome name="bank" color={"#301B92"} size={24} />
        </View>
        <View className="ml-3">
          <Text className="font-bold">{recipient?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <Header title="Select Banks" isModal={true} setIsVisible={setIsVisible} />
      <View className="px-5">
        {/* Search Input */}
        <View className="mb-3">
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Search Bank Name"
            returnKeyType="search"
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>

        {loading && <ActivityIndicator size="small" color="#000" />}
        <View>
          <Text className="text-[20px] font-medium mb-3">Banks</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => <BanksItem recipient={item} />}
              ListEmptyComponent={<Text>No banks found</Text>}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
