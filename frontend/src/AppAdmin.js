import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/layout";
import Adminka from "./components/pages/adminka/Adminka";
import { React } from "react";

const AppAdmin = () => {
  const { token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <Loader />;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isAuthenticated,
        }}
      >
        <BrowserRouter>
          <Header />
          <Adminka />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default AppAdmin;
