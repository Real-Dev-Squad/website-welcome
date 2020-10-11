const userLogin = document.querySelector("#login-btn")

const setUserName = (name) => {
    if(name){
        userLogin.innerHTML = `Hello ${name}!`
    }
}

let url = "https://staging-api.realdevsquad.com/users/self"

fetch(url, {
    "credentials": "include"
})
.then(res => res.json())
.then(res => setUserName(res.first_name))
.catch(err => console.log(err))