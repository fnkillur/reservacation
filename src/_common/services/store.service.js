import * as apiService from '../services/_/api.service';

export function getStores() {
    return apiService.getAction('api/stores');
}

export function getStoreById(id) {
    return apiService.getAction(`api/store/${id}`);
}