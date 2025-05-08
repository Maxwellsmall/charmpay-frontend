import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import useApi from "@/hooks/useApi";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthProvider";
import { useLocalSearchParams } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 4;

export default function page() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { withdraw } = useApi();
  const { recipientId } = useLocalSearchParams();

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
    <>
      <View className="px-5 bg-white">
        <View className="mt-20">
          <Text className="font-semibold text-[#9D9D9D] mb-3 text-[20px]">
            Amount
          </Text>
          <View className="py-2 placeholderTextColor-[#F5F5F5] bg-[#F5F5F5] w-[100%] rounded-md flex-row justify-between items-center">
            <TextInput
              className="w-full px-5 "
              placeholder="NGN"
              keyboardType="number-pad"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
          <Text className="font-semibold mt-3 text-[#9D9D9D] text-[15px]">
            Fee: NGN 10.00
          </Text>
          <TouchableOpacity
            className="bg-blue-900 w-full p-3 rounded-lg mt-3 flex-row justify-center items-center"
            onPress={() => {
              setShowPinModal(true);
            }}
          >
            <Text className="text-white text-center font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
                        withdraw(amount, recipientId, pin, setLoading);
                        setShowPinModal(false);
                        setValue("");
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
                        <Text style={styles.cellText}>
                          {symbol ? "●" : isFocused ? <Cursor /> : null}
                        </Text>
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
      </View>
    </>
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
