const { signUpUser, logInUser, logOutUser, deleteUser } = require('../../lib/testing/API/user.js');

let token = null;
let id = null;

describe('User model', () => {
  it('Should signup a user', async (done) => {
    const test = {
      input: {
        email: "user@zplinux.com",
        password: "password"
      },
      output: {
        email: "user@zplinux.com"
      }
    };

    const url = "http://127.0.0.1:4000/api/Users";

    const result = await signUpUser({
      url,
      params: test.input
    });

    id = result.id;

    expect(result.email).toEqual(test.output.email);

    done();
  });

  it('Should login a user', async (done) => {
    const test = {
      input: {
        email: "user@zplinux.com",
        password: "password"
      },
      output: {
        email: "user@zplinux.com"
      }
    };

    const url = "http://localhost:4000/api/Users/login";

    const result = await logInUser({
      url,
      params: test.input
    });

    token = result.accessToken;

    expect(result.email).toEqual(test.output.email);
    expect(token).toBeDefined;

    done();
  })

  it('Should logout a user', async (done) => {
    const url = `http://localhost:4000/api/Users/logout`;

    const response = await logOutUser({
      url,
      token
    });

    expect(response.status).toEqual(204);

    done();
  })

  it('Should delete a user', async (done) => {
    const url = `http://localhost:4000/api/Users/${id}`;

    const response = await deleteUser({
      url,
      params: { id },
      token
    });

    const result = await response.text()

    expect(response.status).toEqual(200);
    expect(result).toEqual("OK");

    done();
  })
});
