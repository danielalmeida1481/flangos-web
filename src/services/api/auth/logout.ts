import { ApiCore } from "../utilities/core";

const apiAuthLogout = new ApiCore({
    get: false,
    post: true,
    put: false,
    remove: false,
    url: 'logout'
});

export default apiAuthLogout;