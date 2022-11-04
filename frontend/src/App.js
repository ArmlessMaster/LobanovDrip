
import './App.css';
import { useRoutes } from "./components/routers/Routers";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/header/Header";

import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import {Loader} from "./components/layout/loader/Loader"


const App = () => {

  const { token, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);


  if (!ready) {
    return <Loader />
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
          <div className="Main-Wrapper">{routes}</div>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
