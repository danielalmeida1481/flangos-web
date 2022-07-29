import { ApiCore } from "./utilities/core";

const apiExercise = new ApiCore({
    get: true,
    post: true,
    put: true,
    remove: true,
    url: 'api/exercise'
});

export default apiExercise;