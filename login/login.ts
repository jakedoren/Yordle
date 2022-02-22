import axios from 'axios'

function setCookie(name: string, value: string) {
    document.cookie = name + "=" + ("Bearer " + value || "") + "; path=/";
}

function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const sendToHtmlPage = (isLoggedIn: boolean): void => {
    console.log(isLoggedIn)
    if(!isLoggedIn) {
        window.location.replace("http://localhost:3000/login.html")
    } else {
        // window.location.replace("http://localhost:3000/")
    }
}

const authCookie = getCookie("yordle-auth")

if(authCookie) {
    console.log(getCookie("yordle-auth"))
    axios.get('http://localhost:8080/user/isloggedin', {
        headers: {
            "authorization": authCookie
        }
    })
    .then(function (response) {
        console.log(response)
        sendToHtmlPage(response.data)
    })
    .catch(function (error) {
        console.log(error);
    })
} else {
    window.location.replace("http://localhost:3000/")
}

export { getCookie, setCookie }
