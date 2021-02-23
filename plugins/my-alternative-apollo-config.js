import * as Realm from "realm-web";

const app = Realm.App.getApp(process.env.REALM_APP_ID);
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${process.env.REALM_APP_ID}/graphql`;

async function loginApiKey(apiKey) {
  // Create an API Key credential
  const credentials = Realm.Credentials.apiKey(apiKey);
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}

async function loginCustomJwt(jwt) {
  // Create a Custom JWT credential
  const credentials = Realm.Credentials.jwt(jwt);
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    // assert(user.id === app.currentUser.id);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}
// loginApiKey(process.env.REALM_APP_KEY).then((response) =>
//   console.log(response.accessToken)
// );
export default (context) => {
  return {
    httpEndpoint: graphql_url,
    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    // getAuth: async ($auth) => {
    //   const accessToken = (await loginApiKey(context.env.REALM_APP_KEY))
    //     .accessToken;
    //   return `Bearer ${accessToken}`;
    // },
    // getAuth: () => 'Bearer my-static-token',
  };
};
