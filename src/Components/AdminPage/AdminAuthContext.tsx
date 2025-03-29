/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

export const AdminAuthContext = React.createContext({
  autorized: false,
  login: (_username: string, _password: string) => Promise.resolve(),
});

type Props = {
  children: React.ReactNode;
}

export const AdminAuthProvider: React.FC<Props> = ({ children }) => {
  const [autorized, setAutorized] = useState(false);

  async function login(username: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      if (username !== "admin" || password !== "12345") {
        reject(new Error("Incorrect username or password"));
      } else {
        setAutorized(true);
        resolve();
      }
    });
  }

  return (
    <AdminAuthContext.Provider value={{ autorized, login }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
