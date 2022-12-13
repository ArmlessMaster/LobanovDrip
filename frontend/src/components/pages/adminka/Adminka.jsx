import jsonRestDataProvider from "ra-data-fakerest";
import { Admin, Resource, EditGuesser, defaultTheme } from "react-admin";
import { ClothestList } from "./clothes";
import { render } from "react-dom";
import ClothesEdit from "./ClothesEdit";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useHttp } from "../../../hooks/http.hook";
import { Loader } from "../../layout";
import { React, useCallback, useState, useEffect } from "react";

const theme = {
  ...defaultTheme,
  palette: {
    mode: "dark",
  },
};

const Adminka = () => {
  const [clothes, setClothes] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { request } = useHttp();
  const [dataProvider, setDataProvider] = useState([]);
  const fetchClothes = useCallback(async () => {
    try {
      await request("/api/clothes/find")
        .then((res) => {
          setClothes(res.clothes);
          setDataProvider(jsonRestDataProvider({ clothes: res.clothes }, true));
        })
        .then(() => {
          if (!(dataProvider === undefined || dataProvider.length === 0)) {
            setHasLoaded(true);
          }
        });
    } catch (e) {}
  }, [request, dataProvider]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);


  return hasLoaded ? (
    <Admin theme={theme} dataProvider={dataProvider}>
      <Resource
        name="clothes"
        options={{ label: "Clothes" }}
        list={ClothestList}
        icon={CheckroomIcon}
        edit={ClothesEdit}
      />
    </Admin>
  ) : (
    <Loader></Loader>
  );
};
export default Adminka;
