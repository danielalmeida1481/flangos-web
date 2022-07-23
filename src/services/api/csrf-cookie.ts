import { ApiCore } from "./utilities/core";

const apiCsrfCookie = new ApiCore({
    get: true,
    post: false,
    put: false,
    remove: false,
    url: 'sanctum/csrf-cookie'
});

export default apiCsrfCookie;