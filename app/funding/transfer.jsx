import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import RecipientModal from "@/components/RecipientModal";
import { router } from "expo-router";
import Beneficiary from "@/components/Beneficiary";
import User from "@/components/User";
import useApi from "@/hooks/useApi";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { FontAwesome6 } from "@expo/vector-icons";

const CELL_COUNT = 4;

export default function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isBeneficiary, setIsBeneficiary] = useState(false);
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { transfer } = useApi();

  const handleContinue = () => {
    if (!amount) {
      Alert.alert("", "Please Input your amount");
      return;
    }

    if (!recipient) {
      Alert.alert("", "Please select your recipient");
      return;
    }
    setShowModal(true);
  };
  const closeModal = () => {
    Alert.alert("", "Are you sure you want to cancel this transaction?", [
      {
        text: "NO",
        onPress: () => {
          return;
        },
      },
      {
        text: "YES",
        style: "destructive",
        onPress: () => {
          setShowModal(false);
        },
      },
    ]);
  };
  const closePinModal = () => {
    Alert.alert("", "Are you sure you want to cancel this transaction?", [
      {
        text: "NO",
        onPress: () => {
          return;
        },
      },
      {
        text: "YES",
        style: "destructive",
        onPress: () => {
          setShowPinModal(false);
          setValue("");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 mt-4">
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Amount</Text>
          <TextInput
            className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md"
            placeholder="Enter Amount to be held in escrow"
            keyboardType="number-pad"
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <View className="mb-3">
          <Text className="mb-[5px] text-[18px]">Recipient</Text>
          {!recipient ? (
            <TouchableOpacity
              className="px-4 bg-[#F5F5F5] w-full h-[50px] rounded-md flex-row items-center"
              onPress={() => setIsModalVisible(true)}
            >
              <View className="bg-white p-1 rounded-full">
                <Ionicons name="person-outline" size={24} />
              </View>
              <Text className="text-[#A8A8A8] text-center font-bold ms-2">
                Select Recipient
              </Text>
            </TouchableOpacity>
          ) : isBeneficiary ? (
            <Beneficiary
              recipient={recipient}
              setRecipient={setRecipient}
              setIsModalVisible={setIsModalVisible}
              setId={setId}
              // setIsBeneficiary={setIsBeneficiary}
            />
          ) : (
            <User
              recipient={recipient}
              setRecipient={setRecipient}
              setIsModalVisible={setIsModalVisible}
              setId={setId}
            />
          )}
        </View>

        {showModal && (
          <Modal transparent visible={showModal} animationType="slide">
            <View className="flex-1 px-5 items-center justify-center bg-black/30">
              <View className="bg-white w-full py-10 px-5 rounded-lg">
                <TouchableOpacity
                  onPress={closeModal}
                  className="bg-[#f5f5f5] p-2 rounded-full w-10 self-end"
                >
                  <Ionicons name={"close"} size={24} />
                </TouchableOpacity>
                <Text className="text-center mb-2">
                  Transfer to{" "}
                  {isBeneficiary
                    ? recipient?.beneficiaryUser.firstName
                    : recipient?.firstName}{" "}
                  {isBeneficiary
                    ? recipient?.beneficiaryUser.lastName
                    : recipient?.lastName}
                </Text>
                <View className="flex-row items-center justify-center">
                  <FontAwesome6 name="naira-sign" size={25} />
                  <Text className="text-[30px] font-bold">{amount}</Text>
                </View>

                <View className="bg-white w-[100%] p-6 mt-5 justify-center items-center rounded-lg">
                  <Text className="text-[14px] text-black text-left w-full font-bold mb-5 mx-5">
                    Transaction Details
                  </Text>
                  <View className="flex-row justify-between items-center w-full mb-5">
                    <Text className="text-[14px] text-neutral-400">
                      Reciepiant Details
                    </Text>
                    <View className="">
                      <Text className="font-semibold w-52">
                        {isBeneficiary
                          ? recipient?.beneficiaryUser.firstName
                          : recipient?.firstName}{" "}
                        {isBeneficiary
                          ? recipient?.beneficiaryUser.lastName
                          : recipient?.lastName}
                      </Text>
                      <Text className="font-normal text-[10px] text-slate-400">
                        {isBeneficiary
                          ? recipient?.beneficiaryUser.email
                          : recipient?.email}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center w-full mb-5">
                    <Text className="text-[14px] text-neutral-400">
                      Transaction Type
                    </Text>
                    <Text className="font-semibold w-52 capitalize">
                      In-Escrow
                    </Text>
                  </View>

                  <TouchableOpacity
                    className="bg-blue-900 w-full p-3 rounded-lg mt-5 flex-row justify-center items-center"
                    onPress={() => {
                      setShowModal(false);
                      setShowPinModal(true);
                      console.log("data", recipient);
                    }}
                  >
                    <Text className="text-white font-semibold">Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {showPinModal && (
          <Modal transparent visible={showPinModal} animationType="fade">
            <View className="flex-1 items-center justify-center bg-black/30 px-5">
              <View className="bg-white w-full py-5 px-5 rounded-lg">
                <TouchableOpacity
                  onPress={closePinModal}
                  className="bg-[#f5f5f5] p-2 rounded-full w-10 self-end"
                >
                  <Ionicons name={"close"} size={24} />
                </TouchableOpacity>
                <Text className="text-[16px] text-center font-bold mb-4">
                  Enter Transaction PIN
                </Text>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={(pin) => {
                    setValue(pin);
                    if (pin.length === CELL_COUNT) {
                      setTimeout(() => {
                        transfer(id, amount, pin, setLoading); // Call transfer on full input
                        setShowPinModal(false);
                      }, 2000);
                    }
                  }}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      <Text style={styles.cellText}>
                        {symbol ? "●" : isFocused ? <Cursor /> : null}
                      </Text>
                    </View>
                  )}
                />
                {loading && (
                  <ActivityIndicator
                    size={24}
                    color={"blue"}
                    style={{ marginTop: 10 }}
                  />
                )}
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <View className="p-4 mt-auto bg-white">
        <TouchableOpacity
          className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center"
          onPress={handleContinue}
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          <Text className="text-white text-center font-semibold ml-2">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <RecipientModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        setRecipient={setRecipient}
        setIsBeneficiary={setIsBeneficiary}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  codeFieldRoot: {
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
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
    backgroundColor: "white",
  },
  focusCell: {
    borderColor: "#5A67D8",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
