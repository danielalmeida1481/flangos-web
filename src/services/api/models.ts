export interface ICategory {
    id: number,
    name: string
}

export interface IExercise {
    id: number,
    name: string,
    category?: ICategory
}