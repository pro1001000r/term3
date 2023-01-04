import axios from "axios";

export default function GetUser(userid,setUser) {
  //Получаем все параметры:
  if (userid == undefined) {
    return;
  }

  const data = {
    mobileGetUser: {
      id: userid,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = "http://terminal17.ru/Ajax/Obmen/";
  //const data = { stocktaking: { login: log, password: pass } };

  axios
    .post(apiUrl, data, config)
    .then(function (response) {
      console.log(response.data); //вывод
      setUser(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
