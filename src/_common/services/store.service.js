import * as apiService from '../services/_/api.service';

export function getStores() {
    return apiService.getAction('stores');
}

export function getStoreById(id) {
    return apiService.getAction(`store/${id}`);
}

export function getAroundStores(position) {
    return apiService.getAction(`stores/around?bot=${position.bot}&left=${position.left}&top=${position.top}&right=${position.right}`);
}