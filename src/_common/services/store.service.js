import * as apiService from '../services/_/api.service';

export function getStores() {
    return apiService.getAction('storeList');
}

export function getStoreById(id) {
    return apiService.getAction(`stores/${id}`);
}

export function getAroundStores(position) {
    return apiService.getAction(`stores/around?bot=${position.bot}&left=${position.left}&top=${position.top}&right=${position.right}`);
}