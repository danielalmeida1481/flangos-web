import { atom } from "recoil";
import { ICategory } from "../services/api/models";

const categoriesState = atom<ICategory[]>({
    key: 'categoriesState',
    default: []
});

export { categoriesState };