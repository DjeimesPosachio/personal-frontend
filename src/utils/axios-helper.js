export function tokenInterceptor(request) {
    const storageToken = JSON.parse(localStorage.getItem("@Auth:token"))

    if(storageToken && !request.headers.Authorization) {
        request.headers.Authorization = `Bearer ${storageToken}`;
    }
    return request;
}
