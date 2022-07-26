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
    onError?: () => void
}