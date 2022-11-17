import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import { Video } from "expo-av";
import React from "react";
import LeftArrow from "../.././assets/images/login/Arrow 4.svg";
import Mark from "../.././assets/images/login/xMark.svg";
import DecorLogin from "../.././assets/images/login/Login Decor Thing.svg";
import axios from "axios";
import { useHttp } from "../../hooks/http.hook";
import { useState, useCallback, useEffect } from "react";

export default function Login() {
  const pressHandler = () => {
    navigation.navigate("Registration");
  };

  //https://blog.logrocket.com/using-axios-react-native-manage-api-requests/                axios
  //https://reactnative.dev/docs/network                fetch

  // Во все post/delete (кроме регистрации и входа) header должен иметь jwt токен в формате { Authorization: `Bearer ${token}` }
  // https://www.youtube.com/watch?v=QMUii9fSKfQ&ab_channel=PradipDebnath                jwt аутентификация ,
  // В пдф файле БД описаны почти все запросы, что можно сделать на бекенд

  // Можно использовать либо axios либо fetch

  // Используем либо прямо на странице, либо выносим в отдельный файл src/hooks/http.hook - пример, пример использования ниже

  // К событиям элементов привязываем метод, чтоб он вызывался при этом событии
  const get = async () => {
    const response = await axios.get(`http://10.0.2.2:5000/api/clothes`);

    const response1 = await fetch(`http://10.0.2.2:5000/api/clothes`, {
      method: "GET",
      body: null,
      headers: {},
    });

    const data = response.data;

    const data1 = await response1.json();
    console.log(
      "----------------------------------------------------------------"
    );
    console.log(data);
    console.log(data1);
  };

  const register = async () => {
    const response = await axios.post(
      `http://10.0.2.2:5000/api/account/register`,
      {
        name: "newUser",
        email: "email4@gmail.com",
        password: "emailpassword",
      }
    );

    const method = "POST";
    let body = {
      name: "newUser",
      email: "email5@gmail.com",
      password: "emailpassword",
    };
    body = JSON.stringify(body);
    const headers = {};
    headers["Content-Type"] = "application/json";
    const response1 = await fetch(`http://10.0.2.2:5000/api/account/register`, {
      method,
      body,
      headers,
    });

    const data = response.data;

    const data1 = await response1.json();

    console.log(
      "\n----------------------------------------------------------------\n"
    );
    console.log(data);
    console.log(data1);
  };

  const login = async () => {
    const response = await axios.post(
      `http://10.0.2.2:5000/api/account/login`,
      { email: "email@gmail.com", password: "emailpassword" }
    );


    const method = "POST";
    let body = { email: "email4@gmail.com", password: "emailpassword" };
    body = JSON.stringify(body);
    const headers = {};
    headers["Content-Type"] = "application/json";
    const response1 = await fetch(`http://10.0.2.2:5000/api/account/login`, {
      method,
      body,
      headers,
    });


    const data = response.data;

    const data1 = await response1.json();
    console.log(
      "\n----------------------------------------------------------------\n"
    );
    console.log(data);
    console.log(data1);
  };

  const delete1 = async () => {
    const response = await axios.delete(
      `http://10.0.2.2:5000/api/clothes/delete`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWYxNGYwZjMzYWE3OTlhY2FkN2JmNyIsImlhdCI6MTY2NzE3NTgxOSwiZXhwIjoxNjY3MjYyMjE5fQ.ZnC6jk1kEElK-wJl_pbDKcBYWcMjMeB-3aV5wBj5zKc`,
        },
        data: { id: "635fa207c61ba8d6a005c104" },
      }
    );

    const method = "DELETE";
    let body = { id: "635fa74dc61ba8d6a005c1d5" };
    body = JSON.stringify(body);
    const headers = {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWYxNGYwZjMzYWE3OTlhY2FkN2JmNyIsImlhdCI6MTY2NzE3NTgxOSwiZXhwIjoxNjY3MjYyMjE5fQ.ZnC6jk1kEElK-wJl_pbDKcBYWcMjMeB-3aV5wBj5zKc`,
    };
    headers["Content-Type"] = "application/json";
    const response1 = await fetch(`http://10.0.2.2:5000/api/clothes/delete`, {
      method,
      body,
      headers,
    });

    const data = response.data;

    const data1 = await response1.json();
    console.log(
      "\n----------------------------------------------------------------\n"
    );
    console.log(data);
    console.log(data1);
  };

  const postwithfiles = async (
    url,
    method = "GET",
    body = null,
    files = null,
    headers = {}
  ) => {
    const formData = new FormData();
    if (body) {
      body = JSON.stringify(body);
      formData.append("data", body);
      body = formData;
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("pic", files[i]);
      }
      body = formData;
    }

    const response = await axios.post(url, formData);

    const response1 = await fetch(url, {
      method,
      body,
      headers,
    });

    const data = response.data;
    const data1 = await response1.json();

    console.log(
      "\n----------------------------------------------------------------\n"
    );
    console.log(data);
    console.log(data1);
  };

  // loading - изменяется на false - пока запрос не закончен, true - когда закончен
  // нужна кнопке, чтобы нельзя было слать запросы, пока предыдущий не закончился
  const { loading, request } = useHttp();
  const [state, setState] = useState(null);

  // Пример получения данных при загрузке страницы
  const fetchClothes = useCallback(async () => {
    try {
    // Первый параметр - url
    // Второй -метод запроса (по умолчанию GET)
    // Третий - body , обычный обьект {name: "123"}
    // Четвертый - файлы, если их нет - null
    // Пятый - токен, если это get запрос, он не обязателен в нашем случае
      const fetched = await request(
        "http://10.0.2.2:5000/api/clothes",
        //"GET",
        // null,
        // null,
        // {
        //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWQ4MmE4YTFkZGFhMDRmYzZlZDExZiIsImlhdCI6MTY2NzIxNzMxOSwiZXhwIjoxNjY3MzAzNzE5fQ.UDCHuTUy2OuJ0LHzcX97T_yZXwNNeYfOpSh7VWqQ8uk`,
        // }
      );
      setState(fetched);
      console.log(fetched)
      console.log(fetched.clothes[0]._id)
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchClothes();
  }, [fetchClothes]);


  return (
    <View style={{ flex: 1 }}>
      <Video
        source={require("../.././assets/video/background.mp4")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
        shouldPlay
        isLooping
      />
      <View style={{ flex: 0.5 }}></View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Pressable onPress={pressHandler}>
          <Text style={styles.signIn}>SIGN-IN</Text>
          <LeftArrow style={styles.arrow} />
        </Pressable>
        <Mark style={styles.xMark} />
      </View>
      <DecorLogin style={styles.loginThing} />
      <View style={styles.main}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.mainText}>FOR MEMBERS</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="E-MAIL"
            placeholderTextColor="white"
          ></TextInput>
          <TextInput
            style={styles.emailInput}
            secureTextEntry={true}
            placeholder="PASSWORD"
            placeholderTextColor="white"
          ></TextInput>
        </View>
        <Text style={styles.forgotPassword}>I forgot password</Text>

        
        <Pressable onPress={register} disabled={loading} style={styles.enterButton}>
          <Text style={styles.buttonText}>ENTER</Text>
        </Pressable>



        <Pressable style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Log-in with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  xMark: {
    left: "3%",
    position: "absolute",
    borderBottomColor: "black",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  signIn: {
    left: "70%",
    color: "white",
    fontFamily: "VCR_OSD_MONO",
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
  },
  arrow: {
    position: "absolute",
    top: "20%",
    left: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  main: {
    flex: 11,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    flex: 2,
    top: "15%",
    color: "white",
    fontStyle: "normal",
    fontSize: 56,
    fontFamily: "VCR_OSD_MONO",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2.3 },
    textShadowRadius: 5.5,
  },

  forgotPassword: {
    flex: 1,
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 18,
    color: "white",
    top: "2%",
    textDecorationLine: "underline",
    fontFamily: "VCR_OSD_MONO",
  },

  enterButton: {
    bottom: "33%",
    color: "#DB2525",
    width: 175,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB2525",
  },

  googleButton: {
    color: "#DB2525",
    width: 175,
    height: 35,
    bottom: "30%",
    alignItems: "center",
    backgroundColor: "#3124D0",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "VCR_OSD_MONO",
    lineHeight: 47,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 40,
    alignItems: "center",
  },

  googleButtonText: {
    paddingVertical: 12,
    position: "absolute",
    color: "white",
    fontStyle: "normal",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 40,
    fontFamily: "VCR_OSD_MONO",
  },

  loginThing: {
    position: "absolute",
    top: "30%",
    left: "2%",
  },
  emailInput: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    backgroundColor: "#1F1F1F",
    color: "white",
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "VCR_OSD_MONO",
    marginVertical: "3%",
    textAlign: "center",
    height: "15%",
    width: 250,
  },
});
