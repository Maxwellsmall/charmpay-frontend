import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d+$/; // Only allows digits (0-9)
  return phoneRegex.test(phoneNumber);
};

const signup = async (transactionPin, setLoading) => {
  try {
    router.navigate("/auth/signup/verify/success");
    setLoading(true);
    if (!transactionPin) {
      Alert.alert("", "Create a transaction pin before submission");
      return;
    }
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    credentials.transactionPin = transactionPin;
    console.log(credentials);
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/signup",
      credentials
    );
    console.log(response.data);
    Alert.alert("", "Created a bonified account successfully");
    router.navigate("/auth/signup/verify/success");
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const storeData = async (
  firstName,
  lastName,
  phoneNumber,
  countryCode,
  email
) => {
  try {
    if (!firstName || !lastName || !phoneNumber || !countryCode || !email) {
      Alert.alert("", "please fill up form before submission");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("", "Invalid email format");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("", "Invalid phone number");
      return;
    }
    await AsyncStorage.setItem(
      "credentials",
      JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        email,
      })
    );

    const data = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(data);

    console.log(credentials);
    router.navigate("/auth/signup/otp/");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

const updateStorage = async (passcode, confirmPasscode) => {
  try {
    if (!passcode || !confirmPasscode) {
      Alert.alert("", "Please insert passcode before submission");
      return;
    }
    if (passcode !== confirmPasscode) {
      Alert.alert("", "The passcodes does not match");
      return;
    }
    const data = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(data);

    credentials.passCode = passcode;
    await AsyncStorage.setItem("credentials", JSON.stringify(credentials));

    router.navigate("/auth/signup/otp/passcode");
  } catch (error) {
    console.log(error);
  }
};

export default { signup, storeData, updateStorage };
