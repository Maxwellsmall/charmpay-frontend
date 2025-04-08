import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Transactions from "@/components/Transactions";
import useApi from "@/hooks/useApi";

export default function history() {
  const { getAllTransactions } = useApi;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handleFetch = async () => {
    const response = await getAllTransactions(setLoading);
    setTransactions(response);
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
    <TouchableOpacity className="flex-1, mx-5">
      <FlatList
        data={transactions}
        renderItem={({ item }) => <Transactions transaction={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>No beneficiaries found</Text>}
      />
    </TouchableOpacity>
  );
}
