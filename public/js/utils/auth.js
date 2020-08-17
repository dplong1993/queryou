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

////This will direct the user to '/' page if the user has
// already signed in and has a token in their cookies.
export const redirectIfLoggedIn = async () => {
  //Checks if the user is signed in
  const res = await fetch('/api/users/token');

  //If the res from the fetch is ok, the user is signed in
  //so we redirect the page.
  if (res.ok) window.location.href = '/home';
};
