const { signUpUser, logInUser, logOutUser } = require('../../lib/testing/API/user.js');

let token = null;

describe('User model', () => {
  it('Should signup a user', async (done) => {
    const test = {
      input: {
        email: "john", // trick to have username signup easy with Loopback - TOFIX
        password: "myfonciapassword"
      },
      output: {
        email: "john@foncia.com"
      }
    };

    const url = "http://127.0.0.1:4000/api/Users";

    const result = await signUpUser({
      url,
      params: test.input
    });

    expect(result.email).toEqual(test.output.email);

    done();
  });

  it('Should login a user', async (done) => {
    const test = {
      input: {
        email: "john",
        password: "myfonciapassword"
      },
      output: {
        email: "john" // trick to have username signup easy with Loopback - TOFIX
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
    const url = `http://localhost:4000/api/Users/logout?access_token=${token}`;

    const response = await logOutUser({
      url,
      params: test.input
    });

    expect(response.status).toEqual(204);

    done();
  })
});
