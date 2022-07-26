import { ApiCore } from "./utilities/core";

const apiCategory = new ApiCore({
    get: true,
    post: true,
    put: false,
    remove: true,
    url: 'api/category'
});

export default apiCategory;