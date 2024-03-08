export function tokenInterceptor(request) {
    const storageToken = localStorage.getItem("@Auth:token")

    if(storageToken) {
        request.headers.Authorization = `Bearer ${storageToken}`;
    }
    return request;
}
