export const getToken = () => {
  //Returns the token and payload as a string from the cookies
  return document.cookie
    .split('; ')
    .find(cookie => cookie => {
      const [key, value] = cookie.split('=');
      return key === 'token';
    });
}

export const getUser = () => {
  //Call function to get our Token
  const token = getToken();

  //Splits the token and payload and assign the payload.
  const payloadEncoded = token.split('.')[1];

  //Decode the payload
  const payload = atob(payloadEncoded)

  //Creates an object we can work with from the payload
  const user = JSON.parse(payload);

  return user;
}

export const redirectIfLoggedIn = async () => {

};
