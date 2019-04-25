const { signUpUser, logInUser, logOutUser } = require('../../lib/testing/API/user.js');
const { calculateCombinations } = require('../../lib/testing/API/gestionnaire.js')

let token = null;

describe('Gestionnaire model', () => {
  it('Should retrieve combinations of passwords when authenticated', async (done) => {
    const test = {
      input: {
        email: "john", // trick to have username signup easy with Loopback - TOFIX
        password: "myfonciapassword"
      },
      output: {
        result: [ "4545", "461", "466" ]
      }
    };

    // Sign up
    let url = "http://127.0.0.1:4000/api/Users";

    const signUpResult = await signUpUser({
      url,
      params: test.input
    });

    // Log in
    url = "http://localhost:4000/api/Users/login";

    const logInResult = await logInUser({
      url,
      params: test.input
    });

    // Retrieve token
    token = logInResult.accessToken;

    // Retrieve combinations of password from gestionnaire curently authenticated
    url = 'http://localhost:4000/api/Gestionnaires/combinations';

    const combinations = await calculateCombinations({
      url,
      token
    });

    expect(combinations).toEqual(test.output);

    // Log out
    url = `http://localhost:4000/api/Users/logout`;

    const response = await logOutUser({
      url,
      token
    });

    expect(response.status).toEqual(204);
    done();
  });

  it('Should not retrieve combinations of passwords when not authenticated', async (done) => {
    // Retrieve combinations of password from gestionnaire curently authenticated
    const url = 'http://localhost:4000/api/Gestionnaires/combinations';

    const response = await calculateCombinations({ url });

    expect(response.status).toEqual(401);

    done();
  })
});
