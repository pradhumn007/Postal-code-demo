import axios from "axios";

const FetchData = (countryCode, postCode) => {
  return axios({
    url: `https://api.zippopotam.us/${countryCode}/${postCode}`,
    method: "GET",
  }).then((res) => res.data);
};

export default FetchData;
