import { MinusIcon } from "@heroicons/react/solid";
import React from "react";
import { Button, Modal } from "react-daisyui";
import { IForm, IModalState } from "../common/types";

interface IModalFormProps extends IModalState {
    title?: string,
    form?: React.ReactElement<IForm> | any,
    onClose?: () => void
}

export default function ModalForm({ open, title, form, onClose }: IModalFormProps) {
    return (
        <Modal className="bg-base-200" open={open}>
            <Modal.Header className="border-b-2 border-primary pb-2 text-primary uppercase">
                {title}
                <Button color={"error"} className="float-right" size="sm" shape="square" onClick={ onClose }>
                    <MinusIcon className="w-5 h-5" />
                </Button>
            </Modal.Header>

            <Modal.Body>
                {form}
            </Modal.Body>
        </Modal>
    );
}