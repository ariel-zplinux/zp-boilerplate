const { signUpUser, logInUser, logOutUser } = require('../../lib/testing/API/user.js');
const { searchClients } = require('../../lib/testing/API/client.js')

let token = null;

describe('Client model', () => {
  it('Should retrieve clients (also with pagination and/or params) when authenticated', async (done) => {
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

    // Retrieve all clients from gestionnaire curently authenticated (no paginate no params)
    url = 'http://localhost:4000/api/Clients'

    const clients = await searchClients({
      url,
      token
    });

    expect(clients[0].fullname).toEqual('Mrs. Craig Wehner');
    expect(clients.length).toEqual(122)

    // Retrieve clients (by name and email)from gestionnaire curently authenticated (no paginate, params name and email set)
    url = 'http://localhost:4000/api/Clients?params=%7B%22email%22:%22Felicita.Shields95@hotmail.com%22%7D'

    const clientsWithParams = await searchClients({
      url,
      token
    });

    expect(clientsWithParams[0].fullname).toEqual('Augustus Howell');

    // Retrieve 10 clients from gestionnaire curently authenticated (with paginate)
    url = 'http://localhost:4000/api/Clients?pagination=true&limit=10&skip=0'

    const clientsWithPaginate = await searchClients({
      url,
      token
    });

    expect(clientsWithPaginate[0].fullname).toEqual('Mrs. Craig Wehner');
    expect(clientsWithPaginate.length).toEqual(10)

    // Retrieve 10 next clients from gestionnaire curently authenticated (with paginate)
    url = 'http://localhost:4000/api/Clients?pagination=true&limit=10&skip=10'

    const clientsWithPaginateSkip = await searchClients({
      url,
      token
    });

    expect(clientsWithPaginateSkip[0].fullname).toEqual('Talia Mann');
    expect(clientsWithPaginateSkip.length).toEqual(10)

    // Log out
    url = `http://localhost:4000/api/Users/logout`;

    const response = await logOutUser({
      url,
      token
    });

    expect(response.status).toEqual(204);
    done();
  })

  it('Should not retrieve clients when not authenticated', async (done) => {
    // Retrieve all clients from gestionnaire curently authenticated (no paginate no params)
    const url = 'http://localhost:4000/api/Clients'

    const response = await searchClients({
      url,
      token
    });

    expect(response.status).toEqual(401);
    done();
  });
})
