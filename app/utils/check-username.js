import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default async function checkUserName(userName) {
  try {
    const lowerCaseUsername = userName.toLowerCase();
    const response = await fetch(
      `${BASE_URL}/users/isUsernameAvailable/${lowerCaseUsername}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    const { isUsernameAvailable } = data;
    return isUsernameAvailable;
  } catch (error) {
    console.error('Error : ', error);
  }
}
