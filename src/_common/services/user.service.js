import axios from 'axios';
import * as apiService from '../services/_/api.service';

export function findPassword() {

}

export function login(form) {
    return apiService.postAction('auth/token', form);
}

export function register(form) {
    return apiService.postAction('users', form);
}

export function setLogin(me) {
    apiService.setMe(me);
}

export function identifyLogin() {
    refreshMe();
    return apiService.getMe();
}

let refreshMe = () => {
    let me = apiService.getMe();
    if (me) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${me.token}`;
        apiService.postAction('auth/newToken')
            .then(res => {
                apiService.removeMe();
                apiService.setMe({ token: res.data.token });
                axios.defaults.headers.common['Authorization'] = `Bearer ${apiService.getMe().token}`;
            })
            .catch(error => {
                console.log(error);
                apiService.removeMe();
            });
    }
};