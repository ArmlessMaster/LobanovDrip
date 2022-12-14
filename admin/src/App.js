import { React } from "react";
import { Admin, defaultTheme } from "react-admin";
import Dashboard from "./components/dashboard/Dashboard";
import LoginAdmin from "./components/login/Login";
import { authProvider } from "./authProvider/authProvider";
import { Resource } from "react-admin";
import accounts from "./components/accounts";
import clothes from "./components/clothes";
import collection from "./components/collection";
import order from "./components/order";
import { dataProvider } from "./dataProvider/dataProvider";
import "./App.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import GroupIcon from '@mui/icons-material/Group';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import CheckroomIcon from '@mui/icons-material/Checkroom';


const theme = {
  ...defaultTheme,
  palette: {
    mode: "dark",
  },
};
const App = () => {
  return (
    <Admin
    theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={LoginAdmin}
    >
      {(permissions) => (
        <>
          {permissions === "Moderator"? (
            <>
              <Resource icon={CheckroomIcon} name="clothes" {...clothes} />
              <Resource icon={FilterFramesIcon} name="collection" {...collection} />
              <Resource icon={ShoppingBasketIcon} name="order" {...order} />
            </>
          ) : null}
          {permissions === "Admin"  ? (
            <>
              <Resource icon={GroupIcon} name="account" {...accounts} />
              <Resource icon={CheckroomIcon} name="clothes" {...clothes} />
              <Resource icon={FilterFramesIcon} name="collection" {...collection} />
              <Resource icon={ShoppingBasketIcon} name="order" {...order} />
            </>
          ) : null}
        </>
      )}
    </Admin>
  );
};

export default App;
