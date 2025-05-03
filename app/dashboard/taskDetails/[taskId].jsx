import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import useApi from "@/hooks/useApi";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { router, useLocalSearchParams } from "expo-router";
import { AuthContext } from "@/context/AuthProvider";
import DisputeTransaction from "@/components/Disputes";

const CELL_COUNT = 4;

export default function Page() {
  const { getTaskById, disapproveTask, approveTask, getDisputeById } = useApi();
  const { userData } = useContext(AuthContext);
  const { taskId } = useLocalSearchParams();
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [task, setTask] = useState(null);
  const [disputes, setDisputes] = useState(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [buttonAction, setButtonAction] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [status, setStatus] = useState("Completed");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const fetchTask = async () => {
    let response = await getTaskById(taskId, setLoading);
    setTask(response);
    console.log(response?.assignerId);
    console.log(response?.transaction.senderId);
  };
  const fetchDisputes = async () => {
    console.log("disputeId", task?.dispute.id);
    if (task?.dispute == null) {
      setDisputes(null);
    }
    let response = await getDisputeById(task?.dispute?.id, setLoading);
    console.log("response", response);
    setDisputes(response);
  };
  useEffect(() => {
    fetchTask();
    // fetchDisputes();
  }, []);

  // A sample, multiline description

  const statusOptions = ["Completed", "Ongoing", "Canceled"];

  if (loading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size={30} />
      </View>
    );
  }

  const handleDisapprove = () => {
    Alert.alert(
      "",
      "Are you sure you want to disapprove this task?, Disapproving this task will withdraw its reward back to the assigner.",
      [
        {
          text: "CANCEL",
          onPress: () => {
            return;
          },
        },
        {
          text: "PROCEED",
          style: "destructive",
          onPress: () => {
            setButtonAction("disapprove");
            setShowPinModal(true);
          },
        },
      ]
    );
  };
  const handleApprove = () => {
    Alert.alert(
      "",
      "Are you sure you want to approve this task?, Approving this task will send the task reward to the assignee.",
      [
        {
          text: "CANCEL",
          onPress: () => {
            return;
          },
        },
        {
          text: "PROCEED",
          onPress: () => {
            setButtonAction("approve");
            setShowPinModal(true);
          },
        },
      ]
    );
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
    <View className="flex-1 bg-white">
      {/* Top Container */}
      {/* Header / Task Title */}
      {/* Divider / Tabs */}
      <View className="p-2">
        <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
          <View className=" px-4 w-full flex-row justify-center items-center">
            <View className="flex-row py-1 px-1 border-gray-200 border-b-[1px] rounded-md w-96 justify-center items-center">
              {/* Details Button */}
              <TouchableOpacity
                className={`w-[40%] py-1 rounded-md justify-center items-center ${
                  toggle ? "bg-gray-400" : "bg-white"
                }`}
                onPress={() => setToggle(true)}
              >
                <Text className={toggle ? "text-white" : "text-black"}>
                  Details
                </Text>
              </TouchableOpacity>

              {/* Activity Button */}
              <TouchableOpacity
                className={`w-[40%] py-1 rounded-md justify-center items-center ${
                  !toggle ? "bg-gray-400" : "bg-white"
                }`}
                onPress={() => {
                  setToggle(false);
                  fetchDisputes();
                }}
              >
                <Text className={!toggle ? "text-white" : "text-black"}>
                  Activity
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Details or Activity Content */}
        {toggle ? (
          /* DETAILS VIEW */
          <View className="px-4 py-4">
            <Text className="text-xl font-bold mb-4 capitalize">
              {task?.title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.navigate(`/dashboard/taskDetails/viewMore/${taskId}`);
              }}
            >
              <Text className="text-xl text-blue-500 text-center  font-bold mb-4 capitalize">
                View More
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-between py-4 border-b border-gray-300">
              <View className="flex-row items-center">
                <Ionicons name="checkbox-outline" size={20} />
                <View className="ml-2">
                  <Text className="text-gray-500">Status</Text>
                  <Text className=" text-black font-bold capitalize">
                    {task?.status}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between py-4 border-b border-gray-300">
              <View className="flex-row items-center">
                <Ionicons name="person-circle" size={20} />
                <View className="ml-2">
                  <Text className="text-gray-500">Assignee</Text>
                  {task?.assignerId === userData?.id ? (
                    <Text className="text-black font-bold capitalize">
                      {task?.assignee.firstName} {task?.assignee.lastName}
                    </Text>
                  ) : (
                    <Text className="text-black font-bold capitalize">
                      {task?.assigner.firstName} {task?.assigner.lastName}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View className="flex-row justify-between py-4 mb-4 border-b border-gray-300">
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={20} />
                <View className="ml-2">
                  <Text className="text-gray-500">Due Date</Text>
                  <Text className=" text-black font-bold capitalize">
                    {task?.dueDate}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-lg font-semibold mb-2">Description</Text>
            <View className="h-40 text-base text-gray-800 border border-gray-300 rounded-md p-2">
              <Text>{task?.description}</Text>
            </View>
            {task?.transaction?.status === "in-escrow" && (
              <View>
                {task?.assignerId == userData?.id ? (
                  <TouchableOpacity
                    className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center mt-5"
                    onPress={handleApprove}
                  >
                    {loading && <ActivityIndicator size={24} color={"white"} />}
                    <Text className="text-white text-center font-semibold ml-2">
                      APPROVE
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-blue-900 w-96 p-3 rounded-lg self-center flex-row justify-center items-center mt-5"
                    onPress={handleDisapprove}
                  >
                    {loading && <ActivityIndicator size={24} color={"white"} />}
                    <Text className="text-white text-center font-semibold ml-2">
                      DISAPPROVE
                    </Text>
                  </TouchableOpacity>
                )}
                {showPinModal && (
                  <Modal
                    transparent
                    visible={showPinModal}
                    animationType="fade"
                  >
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
                            setValue(pin); // still needed for UI
                            if (pin.length === CELL_COUNT) {
                              setTimeout(() => {
                                if (buttonAction === "approve") {
                                  approveTask(
                                    task?.transaction.taskId,
                                    pin,
                                    setLoading
                                  );
                                } else if (buttonAction === "disapprove") {
                                  disapproveTask(
                                    task?.transaction.taskId,
                                    pin,
                                    setLoading
                                  );
                                }
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
                              style={[
                                styles.cell,
                                isFocused && styles.focusCell,
                              ]}
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
              </View>
            )}
          </View>
        ) : (
          /* ACTIVITY VIEW */
          <View className="px-4 py-4">
            <FlatList
              data={disputes ? [disputes] : []}
              renderItem={({ item }) => <DisputeTransaction disputes={item} />}
              ListEmptyComponent={() => (
                <Text className="text-center font-bold">No Activity found</Text>
              )}
            />
          </View>
        )}
      </View>

      {/* Status and Dropdown */}
    </View>
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
