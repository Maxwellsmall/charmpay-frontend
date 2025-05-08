import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "@/hooks/useApi";
import { router } from "expo-router";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [userBankDetails, setUserBankDetails] = useState({});
  const [userData, setUserData] = useState({});
  const { getProfile } = useApi();

  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await AsyncStorage.getItem("token");
        console.log(data);
        if (!data || data === "null") {
          setAuthenticated(false);
        } else {
          let response = await getProfile(() => {});

          setAuthenticated(true);

          setUserData(response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAuthenticated,
        isFunding,
        setIsFunding,
        referenceId,
        setReferenceId,
        userData,
        setUserData,
        userBankDetails,
        setUserBankDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
