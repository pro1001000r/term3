import axios from "axios";

export default function GetCount(boxid, nomenid, setCount) {
  //Получаем все параметры:
  if (boxid == undefined || nomenid == undefined) {
    setCount(0);
    return 0;
  }
  console.log(nomenid); //вывод
  const data = {
    countstocktaking: {
      boxid: boxid,
      nomenid: nomenid,
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
      setCount(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
