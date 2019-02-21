import * as apiService from '../services/_/api.service';

export function getReviewsByStoreId(storeId, pageNo, perPageNo) {
    return apiService.getAction(`stores/${storeId}/reviews?pageNo=${pageNo}&perPageNo=${perPageNo}`);
}

export function writeReview(form) {
    return apiService.postAction('reviews', form, { headers: { 'content-type': 'multipart/form-data' } });
}

export function getReview(reviewId) {
    return apiService.getAction(`reviews/${reviewId}`);
}