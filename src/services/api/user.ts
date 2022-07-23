import { ApiCore } from "./utilities/core";

const apiUser = new ApiCore({
    get: true,
    post: false,
    put: false,
    remove: false,
    url: 'api/user'
});

export default apiUser;