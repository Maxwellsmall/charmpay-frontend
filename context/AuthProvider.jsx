import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const getToken = async () => {
      try {
        const data = await AsyncStorage.getItem("token");
        console.log(data);
        if (!data || data === "null") {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
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
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
