import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Beneficiary = ({ recipient, setIsModalVisible, setId }) => {
  setId(recipient.beneficiaryUser.id);
  return (
    <View className="flex-row justify-between items-center p-2">
      <TouchableOpacity
        className="flex-row justify-normal items-center"
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={require("@/assets/images/OIP.png")}
          className="rounded-full w-[40px]"
        />
        <View className="ml-3">
          <Text className="text-bold font-bold">
            {recipient?.beneficiaryUser.firstName}{" "}
            {recipient?.beneficiaryUser.lastName}
          </Text>
          <Text className="text-[#616060] font-semibold text-[10px]">
            {recipient?.beneficiaryUser.email}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Beneficiary;
