import axios from "axios"
import { setCookie, getCookie } from './login/login'

console.log('j')

const submitBtn = document.getElementById('log-submit')

const handleSubmit = (e: any): void => {
    e.preventDefault()
    const username = <HTMLInputElement> document.getElementById("username")
    const password = <HTMLInputElement> document.getElementById("password")
    const payload = {
        username: username.value,
        password: password.value
    }
    axios.post('http://localhost:8080/user/authenticate', payload)
        .then(res => {
            setCookie("yordle-auth", res.data.jwt)
        })
        .catch(err => console.log(err))
}

submitBtn?.addEventListener("click", handleSubmit)

export {}