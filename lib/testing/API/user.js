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
    headers:{
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    options.headers["Authorization"] = token;
  }

  const response = await fetch(url, options);

  return response;
};

export const deleteUser = async ({ url, params, token}) => {
  const options = {
    body: JSON.stringify({data: params}),
    method: "DELETE",
    headers: {
      'Accept': 'application/json'
    }
  };

  if (token) {
    url += `?access_token=${token}`
    // TODO check why Loopback does not work with token in header for request with delete method
    // It actually works if launched before logout => logout kind of revoke token
    // But it still works with token attached to url (?access_token=token)
    // options.headers["Authorization"] = token;
  }

  const response = await fetch(url, options);

  return response;
};
