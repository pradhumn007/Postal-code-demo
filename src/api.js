import axios from "axios";

const FetchData = (countryCode, postCode) => {
  return axios({
    url: `https://api.zippopotam.us/${countryCode}/${postCode}`,
    method: "GET",
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default FetchData;
