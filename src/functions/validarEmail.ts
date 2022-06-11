import fetch from "node-fetch";

const validarEmail = async (email: string) => {
  const response = await fetch(
    `https://emailvalidation.abstractapi.com/v1/?api_key=99833be3c3ca44be820fa7641aad966e&email=${email}`
  );
  const responseJson = await response.json();

  if (responseJson.is_valid_format.value === true) {
    return true;
  } else {
    return false;
  }
};

export default validarEmail;
