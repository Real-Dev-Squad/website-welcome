function setNameIfFound(name) {
  const userLogin = document.querySelector(".login-btn");
  if (name) {
    userLogin.innerHTML = `Hello, ${name}!`;
  }
}

function fetchData() {
  const url = "https://api.realdevsquad.com/users/self";

  fetch(url, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => setNameIfFound(res.first_name))
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", fetchData);
