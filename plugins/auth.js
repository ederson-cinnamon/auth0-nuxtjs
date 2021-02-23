import * as Realm from "realm-web";

const app = Realm.App.getApp(process.env.REALM_APP_ID);

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

export default async function ({ $auth, $apolloHelpers }) {
  /* CD (EV on 20210211): if logout give access to realm but using api key */
  console.log($auth.loggedIn)
  if (!$auth.loggedIn) {
    $apolloHelpers.onLogout(/* if not default you can pass in client as first argument, and you can skip reset store as the second argument */);
    const accessToken = (await loginApiKey(process.env.REALM_APP_KEY))
      .accessToken; /* if not default you can pass in client as second argument, you can set custom cookies attributes object as the third argument, and you can skip reset store as the fourth argument */
    $apolloHelpers.onLogin(accessToken);

    return;
  }
  /* CD (EV on 20210211): if loggedIn give access to realm but using custom JWT */
  var jwt = require("jsonwebtoken");
  const app = Realm.App.getApp(process.env.REALM_APP_ID);

  /* CD (EV on 20210211): create custom jwt https://docs.mongodb.com/realm/authentication/custom-jwt/#jwt-payload */
  var payload = {
    aud: process.env.REALM_APP_ID,
    sub: $auth.user.sub,
    exp: Math.floor(Date.now() / 1000) + 36000,
    iat: Math.floor(Date.now() / 1000),
    user_data: {
      email: $auth.user.email,
    },
  };
  /* CD (EV on 20210211):decode the payload */
  var token = jwt.sign(payload, process.env.JWTSigningKey);
  /* CD (EV on 20210211):set apollo header as the accessToken from  loginCustomJwt*/
  const accessToken = (await loginCustomJwt(token))
    .accessToken; /* if not default you can pass in client as second argument, you can set custom cookies attributes object as the third argument, and you can skip reset store as the fourth argument */

  $apolloHelpers.onLogin(accessToken);
 
}
