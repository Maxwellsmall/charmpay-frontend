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

const signup = async (
  firstname,
  lastname,
  phoneNumber,
  passcode,
  transactionPin,
  countryCode,
  email
) => {
  try {
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/signup",
      {
        firstname,
        lastname,
        phoneNumber,
        passcode,
        transactionPin,
        countryCode,
        email,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const storeData = async (
  firstname,
  lastname,
  phoneNumber,
  countryCode,
  email
) => {
  try {
    if (!firstname || !lastname || !phoneNumber || !countryCode || !email) {
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
        firstname,
        lastname,
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

export default { signup, storeData };
