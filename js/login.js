function setNameIfFound(name) {
  const userLogin = document.querySelector('.login-btn');

  if (name) {
    userLogin.innerHTML = `Hello, ${name}!`;
  }
}

function setPhoto(username) {
  if (username) {
    const userImgEl = document.querySelector('.user-profile-pic');

    const userImgURL = `https://raw.githubusercontent.com/Real-Dev-Squad/website-static/main/members/${username}/img.png`;
    userImgEl.src = userImgURL;
  }
}

function fetchData() {
  const url = 'https://api.realdevsquad.com/users/self';
  fetch(url, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((res) => {
      setNameIfFound(res.first_name);
      setPhoto(res.username);
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', fetchData);
