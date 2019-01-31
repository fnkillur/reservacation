import axios from 'axios';
import { defaultUrl } from '../../const/const';

let convertUrl = (url) => {
    return defaultUrl + '/' + url;
};

export function getAction(url, config) {
    return axios.get(convertUrl(url), config);
}

export function postAction(url, config) {
    return axios.post(convertUrl(url), config);
}

export function putAction(url, config) {
    return axios.put(convertUrl(url), config);
}

export function deleteAction(url, config) {
    return axios.delete(convertUrl(url), config);
}

export function setMe(me) {
    sessionStorage.setItem('me', JSON.stringify(me));
}

export function getMe() {
    return JSON.parse(sessionStorage.getItem('me'));
}

export function removeMe() {
    sessionStorage.removeItem('me');
}

export function setAuthorization() {
    let me = this.getMe();
    axios.defaults.headers.common['Authorization'] = `Bearer ${me.token}`;
}