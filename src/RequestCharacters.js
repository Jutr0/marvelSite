import { string } from "prop-types";
const axios = require("axios");

class RequestCharacters {
  static requestCharacters = (params) => {
    let finalResponse = null;
    let finalError = null;

    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        params: params,
      })
      .then((response) => {
        console.log(response);
        finalResponse = response;
      })
      .catch((error) => {
        console.log(error);
        finalError = error;
      })
      .then(function () {});
    while (finalResponse === null && finalError === null) {}
    if (finalError !== null) {
      return finalError;
    } else return finalResponse;
  };
}
export default RequestCharacters;
