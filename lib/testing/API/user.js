const fetch = require('cross-fetch');

export const signUpUser = async ({ url, params}) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();

  return result;
};

export const logInUser = async ({ url, params}) => {
  const response = await fetch(url, {
    body: JSON.stringify(params),
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();

  return result;
};

export const logOutUser = async ({ url, params}) => {
  const response = await fetch(url, {
    method: "GET",
    headers:{
      'Content-Type': 'application/json'
    }
  });

  return response;
};
