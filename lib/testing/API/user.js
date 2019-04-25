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

export const logOutUser = async ({ url, token}) => {
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    options.headers["Authorization"] = token;
    console.log(options)
  }

  const response = await fetch(url, options);

  return response;
};
