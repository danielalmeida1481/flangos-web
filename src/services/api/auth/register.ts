import { ApiCore } from "../utilities/core";

const apiAuthRegister = new ApiCore({
    get: false,
    post: true,
    put: false,
    remove: false,
    url: 'register'
});

export default apiAuthRegister;