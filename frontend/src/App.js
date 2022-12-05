
import './App.css';
import { useRoutes } from "./components/routers/Routers";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/cartContext";
import {Loader} from "./components/layout"
import {useState} from "react"

const App = () => {

  const { token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <>
    <CartProvider>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isAuthenticated,
        }}
      >
        <BrowserRouter>
        <Header/>
          <div className="Main-Wrapper">{routes}</div>
        </BrowserRouter>
      </AuthContext.Provider>
    </CartProvider>
    </>
  );
}

export default App;
