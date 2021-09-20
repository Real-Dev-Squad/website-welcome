import ENV from 'website-my/config/environment';

const { BASE_API_URL } = ENV;

const registerUser = (user) =>
  fetch(`${BASE_API_URL}/users/self`, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

export default registerUser;
