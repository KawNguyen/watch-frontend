import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/use-api/useAuth";

interface UserContextProps {
  user: any;
  userId: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useAuth();
  const user = getUser();
  const userId = user?.id;

  return (
    <UserContext.Provider value={{ user, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
