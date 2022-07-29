export interface IUser {
    name: string,
    email: string
}

export interface IModalState {
    open?: boolean,
    confirmLoading?: boolean,
    cancelLoading?: boolean
}

export interface IForm {
    onSubmit?: () => void,
    onError?: () => void,
    reset?: boolean,
    setReset?: React.SetStateAction<boolean> | any
}

export interface IFormEdit extends IForm {
    id?: number
}

export interface ITable {
    update?: boolean,
    setUpdate?: React.SetStateAction<boolean> | any
}