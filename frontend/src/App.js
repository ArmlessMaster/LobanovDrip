
import './App.css';
import { useRoutes } from "./components/routers/Routers";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/layout/header/Header";
import { Footer } from "./components/layout/footer/Footer";
import { Authorization } from "./components/pages/authorization/Authorization";

function App() {
  return (
    <div className="App">
      <Header/>
      <Footer/>
      <Authorization/>
            {<div className='Main-Wrapper'></div>}
    </div>
  );
}

export default App;
