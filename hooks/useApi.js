import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateNumber = (phoneNumber) => {
  const phoneRegex = /^\d+$/; // Only allows digits (0-9)
  return phoneRegex.test(phoneNumber);
};

const signup = async (transactionPin, setLoading) => {
  try {
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
    console.log(error.response.data.message);
    Alert.alert(
      "",
      error.response.data.message
        ? error.response.data.message
        : "Check your Internet connection"
    );
  } finally {
    setLoading(false);
  }
};
const login = async (email, passCode, setLoading) => {
  try {
    setLoading(true);
    if (!email || !passCode) {
      Alert.alert("", "Input your details before submission");
      return;
    }

    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/login",
      {
        email,
        passCode,
      }
    );
    console.log(response.data);
    const token = response.data.token;
    console.log(token);
    AsyncStorage.setItem("token", token);

    // check if user have verified thier email
    if (!response.data.user.emailVerified) {
      router.navigate("/auth/signup/verify");
      await requestOtp();
      Alert.alert(
        "",
        "Logged in successfully, verify your account to continue"
      );

      return response.data;
    }
    Alert.alert("", "Logged in successfully");

    router.dismissAll();
    router.push("/(tabs)/dashboard");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(
      "",
      (error.response.data.message && error.response.data.message) ||
        "Check your internet connection"
    );
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
      Alert.alert("", "Please fill up form before submission");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("", "Invalid email format");
      return;
    }
    if (!validateNumber(phoneNumber)) {
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
    router.navigate("/auth/signup/code/passcode");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

const storePasscode = async (passcode, confirmPasscode) => {
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

    router.navigate("/auth/signup/code/transactionCode");
  } catch (error) {
    console.log(error);
  }
};

const verify = async (otp, setLoading) => {
  console.log("otp", otp);
  try {
    setLoading(true);
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    const email = credentials.email;
    console.log(email, otp);
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/verify/account",
      {
        email,
        otp,
      }
    );
    router.navigate("/auth/login");
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    Alert.alert(
      "",
      error.response.data.message
        ? error.response.data.message
        : "Check Your Internet Connection"
    );
  } finally {
    setLoading(false);
  }
};
const requestOtp = async (setLoading) => {
  try {
    setLoading(true);
    const storedData = await AsyncStorage.getItem("credentials");
    const credentials = JSON.parse(storedData);

    const email = credentials.email;
    console.log(email);
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/auth/verify/requestOTP",
      {
        email,
      }
    );
    console.log(response.data);
    Alert.alert("", "An OTP has been sent to your email");
    return response.data;
  } catch (error) {
    // console.log(error.response.data.error);
    Alert.alert("", error.response.data.error.message);
  } finally {
    setLoading(false);
  }
};
const getProfile = async (setLoading) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No authentication token found. Please log in.");
      router.replace("/auth/login");
      return;
    }

    const response = await axios.get(
      "https://charmpay-backend.vercel.app/api/user/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Handle 401 Unauthorized error explicitly
    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("User Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile Fetch Error:", error);

    // Show error message based on error type
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch profile."
        : "Check your internet connection.",
      [{ text: "Retry", onPress: () => getProfile(setLoading) }]
    );
  } finally {
    setLoading(false);
  }
};
const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    Alert.alert("", "Account Logged out successfully");
    router.dismissAll();
    router.push("/auth/");
  } catch (error) {
    console.log(error ? error : "Check Your Internet Connection");
  }
};
const addFunding = async (
  amount,
  setIsFunding,
  setUrl,
  setLoading,
  setReferenceId
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!amount) {
      Alert.alert("", "Insert your amount");
      return;
    }
    if (!validateNumber(amount)) {
      Alert.alert("", "Invalid number");
      return;
    }
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/funding/init",
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.data);
    setUrl(response.data.data.authorization_url);
    setReferenceId(response.data.data.reference);
    setIsFunding(true);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  } finally {
    setLoading(false);
  }
};
const verifyFunding = async (reference, setLoading) => {
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    const response = await axios.post(
      "https://charmpay-backend.vercel.app/api/funding/verify",
      {
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    router.dismissTo("/(tabs)/dashboard");
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  } finally {
    setLoading(false);
  }
};
const getAlltransactions = async (setLoading) => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "https://charmpay-backend.vercel.app/api/transaction/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 401) {
      Alert.alert("Session Expired", "Please log in again.");
      await AsyncStorage.removeItem("token"); // Clear invalid token
      router.replace("/auth/login");
      return;
    }

    console.log("Transactions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
  } finally {
    setLoading(false);
  }
};
const editProfile = async (firstName, lastName, setLoading) => {
  try {
    const token = await AsyncStorage.getItem("token");
    setLoading(true);
    if (!firstName || !lastName) {
      Alert.alert("", "Edit your profile before saving");
      return;
    }

    const response = await axios.patch(
      "https://charmpay-backend.vercel.app/api/user/me/edit",
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    Alert.alert("Saved!", response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const fetchAllBeneficiary = async (setLoading) => {
  try {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "No authentication token found. Please log in.");
      router.replace("/auth/login");
      return;
    }

    const response = await axios.get(
      "https://charmpay-backend.vercel.app/api/beneficiary/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);

    // Show error message based on error type
    Alert.alert(
      "Error",
      error.response
        ? error.response.data.message || "Failed to fetch beneficiary."
        : "Check your internet connection.",
      [
        { text: "Retry", onPress: () => fetchAllBeneficiary(setLoading) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  } finally {
    setLoading(false);
  }
};

export default {
  signup,
  login,
  storeData,
  storePasscode,
  verify,
  requestOtp,
  getProfile,
  logout,
  addFunding,
  verifyFunding,
  editProfile,
  fetchAllBeneficiary,
};
