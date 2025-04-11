import { useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Bank = ({ recipient, setIsModalVisible, setBankCode, setType }) => {
  useEffect(() => {
    if (recipient) {
      console.log(recipient.code);
      setBankCode(recipient.code);
      setType(recipient.type);
    }
  }, [recipient]);
  return (
    <View className="flex-row justify-between items-center my-2">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => setIsModalVisible(true)}
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
};

export default Bank;
