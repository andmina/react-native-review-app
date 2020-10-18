//const BASE_URL = "http://localhost:3000";
const BASE_URL = "http://192.168.86.44:3000";


export const reviewApi = (path, options = {}) =>
  fetch(`${BASE_URL}/api${path}`, options).then(async res => {
    const responseJson = await res.json();

    if (res.ok) {
      return responseJson;
    }

    throw new Error(responseJson.error);
  });
