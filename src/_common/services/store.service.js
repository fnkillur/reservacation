import * as apiService from '../services/_/api.service';

export function getStores() {
    return apiService.getAction('stores');
}

export function getStoreById(id) {
    return apiService.getAction(`store/${id}`);
}