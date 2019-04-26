import axios from 'axios';
import {defaultUrl} from '../../const/const';

const convertUrl = (url) => {
  return defaultUrl + '/' + url;
};

export function getAction(url, config) {
  setAuthorization();
  return axios.get(convertUrl(url), config);
}

export function postAction(url, formData, config) {
  setAuthorization();
  return axios.post(convertUrl(url), formData, config);
}

export function putAction(url, formData, config) {
  setAuthorization();
  return axios.put(convertUrl(url), formData, config);
}

export function deleteAction(url, config) {
  setAuthorization();
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
  const me = getMe();
  if (me) axios.defaults.headers.common['Authorization'] = `Bearer ${me.token}`;
}