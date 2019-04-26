const fetch = require('cross-fetch');

export const searchClients = async ({ url, token}) => {
  const options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    options.headers["Authorization"] = token;
  }

  const response = await fetch(url, options);

  // to prevent attempting json() function on response
  if (response.status === 401)
    return response;

  const result = await response.json();

  return result;
};
