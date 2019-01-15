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
