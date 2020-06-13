const TokenKey = ''
const islogin= false
const user = ''
export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    //return Cookies.set(TokenKey, token)
    return localStorage.setItem('token',token);
}
export function removeToken() {
    return localStorage.removeItem('token');
}
export function setUser(user) {
    return localStorage.setItem('user',JSON.stringify(user));
}
export function getUser() {
    return localStorage.getItem('user');
}
export function setLogin(islogin) {
    return localStorage.setItem('IS_LOGIN',islogin);
}
export function getLogin() {
    return localStorage.getItem('IS_LOGIN');
}
export function removeLogin() {
    return localStorage.removeItem('IS_LOGIN');
}
