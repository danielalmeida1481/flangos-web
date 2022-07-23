import { ApiCore } from "../utilities/core";

const apiAuthLogin = new ApiCore({
    get: false,
    post: true,
    put: false,
    remove: false,
    url: 'login'
});

export default apiAuthLogin;