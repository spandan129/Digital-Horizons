import React, { useState, createContext, useContext, useEffect } from "react";

const NewSchoolContext = createContext();

export const NewSchoolContextProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(() => {
    const savedSchoolId = localStorage.getItem("school_admin_id");
    try {
      // Attempt to parse the saved value
      return savedSchoolId ? JSON.parse(savedSchoolId) : null;
    } catch (error) {
      // If parsing fails, return the raw string
      console.error("Error parsing school_admin_id:", error);
      return savedSchoolId;
    }
  });

  useEffect(() => {
    if (schoolId !== null && schoolId !== undefined) {
      localStorage.setItem("school_admin_id", JSON.stringify(schoolId));
    } else {
      localStorage.removeItem("school_admin_id");
    }
  }, [schoolId]);

  return (
    <NewSchoolContext.Provider value={{ schoolId, setSchoolId }}>
      {children}
    </NewSchoolContext.Provider>
  );
};

export const useNewSchoolContext = () => useContext(NewSchoolContext);
