import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importing an icon library

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Settings Options */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("LoginSettings")}
      >
        <Text style={styles.optionText}>Login Settings</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("PaymentSettings")}
      >
        <Text style={styles.optionText}>Payment Settings</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("TaskDispute")}
      >
        <Text style={styles.optionText}>Task and Dispute Preferences</Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => alert("Signed Out")}
      >
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: "",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  signOutText: {
    color: "white",
    fontWeight: "bold",
  },
});
