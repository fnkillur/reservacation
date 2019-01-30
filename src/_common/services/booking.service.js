import * as apiService from '../services/_/api.service';

export function getWaitingCount(storeId) {
    return apiService.getAction(`bookings/${storeId}/waitingCount`);
}

export function bookStore(form) {
    return apiService.postAction(`bookings/${form.storeId}`, form);
}