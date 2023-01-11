import axios from "axios";

export default function SetUserParams(userparams) {
    
  //Получаем все параметры:
  if (userparams == undefined) {
    return;
  }

  const data = {
    mobileSetUserParams: {
      users_id: userparams.users_id,
      storage_id: userparams.storage_id,
      box_id: userparams.box_id,
    },
  };

  //console.log(data); //вывод

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
      //console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
