import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const user = {
    email: "",
    password: "",
    company_id: 1,
    id: 2,
    name: "amaiello"
  };
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(user);
  
  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
