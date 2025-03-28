import { View, Text, ScrollView } from "react-native";
import React from "react";
import Transactions from "@/components/Transactions";

export default function history() {
  const { getAllTransactions } = useApi;
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState({});
  useEffect(() => {
    const handleFetch = async () => {
      const response = await getAllTransactions(setLoading);
      setTransactions(response);
    };
    handleFetch();
  }, []);
  return (
    <View className="flex-1, mx-5">
      <ScrollView>
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
        <Transactions status="success" />
      </ScrollView>
    </View>
  );
}
