import { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import useApi from "@/hooks/useApi";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthProvider";

const Page = () => {
  const { getDisputeById } = useApi();
  const { userData } = useContext(AuthContext);
  const { disputeId } = useLocalSearchParams();
  const [dispute, setDispute] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchDispute = async () => {
    let response = await getDisputeById(disputeId, setLoading);
    setDispute(response);
  };
  useEffect(() => {
    fetchDispute();
    console.log(disputeId);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }
  const renderItem = ({ item }) => {
    const {
      task,
      raisedBy,
      createdAt,
      raiser,
      receiver,
      raiserEvidence,
      receiverEvidence,
    } = item;

    return (
      <View className="bg-white p-4 mb-4 rounded-2xl shadow">
        <Text className="text-lg font-semibold text-gray-800">
          {dispute?.task?.title}
        </Text>

        <View className="flex-row mt-2">
          <Text className="text-gray-500 w-24">Raised By:</Text>
          <Text className="text-gray-800 flex-1">
            {raiser?.firstName} {raiser?.lastName}
          </Text>
        </View>

        <View className="flex-row mt-1">
          <Text className="text-gray-500 w-24">Against:</Text>
          <Text className="text-gray-800 flex-1">
            {receiver?.firstName} {receiver?.lastName}
          </Text>
        </View>

        <View className="flex-row mt-1">
          <Text className="text-gray-500 w-24">Evidence:</Text>
          <Text className="text-gray-800 flex-1" numberOfLines={2}>
            {raiserEvidence?.text}
          </Text>
        </View>

        {receiverEvidence && (
          <View className="flex-row mt-1">
            <Text className="text-gray-500 w-24">Reciever Evidence:</Text>
            <Text className="text-gray-800 flex-1" numberOfLines={2}>
              {receiverEvidence?.text}
            </Text>
          </View>
        )}

        <Text className="text-right text-xs text-gray-400 mt-2">
          {new Date(createdAt).toLocaleDateString()}
        </Text>
        {!receiverEvidence && (
          <View className="p-4 mt-auto bg-white">
            {userData?.id !== raiser?.id && (
              <TouchableOpacity
                className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center"
                onPress={() =>
                  router.navigate(
                    `/tasks/disputes/recieverEvidence/${disputeId}`
                  )
                }
              >
                {loading && <ActivityIndicator size={24} color={"white"} />}
                <Text className="text-white text-center font-semibold ml-2">
                  Provide Evidence
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={[dispute]}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default Page;
