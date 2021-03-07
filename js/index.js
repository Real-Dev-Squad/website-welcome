document.getElementById("card-1").onclick = function() {
    redirectTo("./faq.html");
};

document.getElementById("card-2").onclick = function() {
    redirectTo("./discord.html");
};

document.getElementById("card-3").onclick = function() {
    redirectTo("./code-of-conduct.html");
};

function redirectTo(redirectURL) {
    window.location.href=redirectURL;
}
