import React, { createContext, useContext, useState } from "react";
import type { UserProfile } from "./social";

interface AuthContextValue {
  currentUser: UserProfile;
  updateBio: (bio: string) => void;
}

const INITIAL_USER: UserProfile = {
  id: 1,
  name: "Phạm Thị Thúy",
  handle: "@phamthuyvn",
  bio: "Học React + TypeScript | Xây dựng giao diện mạng xã hội.",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);

  const updateBio = (bio: string): void => {
    setCurrentUser((prev) => ({ ...prev, bio }));
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateBio }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải nằm trong AuthProvider");
  }
  return context;
}