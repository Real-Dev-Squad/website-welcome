function setNameIfFound(name){
    const userLogin = document.querySelector("#login-btn");
    if(name){
        userLogin.innerHTML = `Hello ${name}!`;
    };
};

let url = "https://staging-api.realdevsquad.com/users/self";

fetch(url, {
    "credentials": "include"
})
.then(res => res.json())
.then(res => setNameIfFound(res.first_name))
.catch(err => console.log(err));