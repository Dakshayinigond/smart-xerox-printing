import React, { createContext, useState } from "react";

export const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]); // all uploaded files
  const [currentUpload, setCurrentUpload] = useState(null); // file pending slot/payment
  const [user, setUser] = useState(null); // logged-in user

  // Add uploaded file
  const addUpload = (file) => {
    setUploads((prev) => [...prev, file]);
    setCurrentUpload(file);
  };

  const clearCurrentUpload = () => setCurrentUpload(null);

  // Login user
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UploadContext.Provider value={{
      uploads,
      currentUpload,
      addUpload,
      clearCurrentUpload,
      user,
      loginUser,
      logoutUser
    }}>
      {children}
    </UploadContext.Provider>
  );
};
