import { ApiCore } from "../utilities/core";

const apiUserPassword = new ApiCore({
    get: false,
    post: false,
    put: true,
    remove: false,
    url: 'user/password'
});

export default apiUserPassword;