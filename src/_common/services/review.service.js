import * as apiService from '../services/_/api.service';

export function getReviewsByStoreId(storeId, pageNo, perPageNo) {
    return apiService.getAction(`reviews/${storeId}?pageNo=${pageNo}&perPageNo=${perPageNo}`);
}

export function writeReview(form) {
    return apiService.postAction('reviews', form);
}