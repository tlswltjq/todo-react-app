import { API_BASIC_URL } from "../api-config";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem("Access_Token");
  if (accessToken && accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASIC_URL + api,
    method: method,
  };

  if (request) {
    //GET
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {
      // console.log(response)
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = "/login";
      } else {
        // Promise.reject(response);
        // throw Error(response);
        new Error(response);
      }
    })
    .catch((error) => {
      console.log("http error");
      console.log(error);
    });
}
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem("Access_Token", response.token);
      window.location.href = "/";
    }
  });
}
export function signout(){
  localStorage.setItem("Access_Token", null);
  window.location.href ="/login";
}
