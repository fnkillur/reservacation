import * as apiService from '../services/_/api.service';

export function getWaitingCount(storeId) {
    return apiService.getAction(`bookings/${storeId}/waitingCount`);
}

export function getMyReservation(storeId) {
    return apiService.getAction(`bookings/${storeId}`)
}

export function bookStore(form) {
    apiService.setAuthorization();
    return apiService.postAction(`bookings/${form.storeId}`, form);
}