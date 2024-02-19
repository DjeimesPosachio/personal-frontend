export function tokenInterceptor(request) {
    const token = localStorage.getItem();

    if(token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
}
