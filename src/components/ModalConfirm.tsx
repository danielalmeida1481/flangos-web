import { Button, Modal } from "react-daisyui";
import { IModalState } from "../common/types";

interface IModalConfirmProps extends IModalState {
    title?: string,
    text?: string,
    onConfirm?: () => void,
    onCancel?: () => void
}

export default function ModalConfirm({ open, title, text, confirmLoading, cancelLoading, onConfirm, onCancel }: IModalConfirmProps) {
    return (
        <Modal className="bg-base-200 w-80" open={open}>
            <Modal.Header className="border-b-2 border-primary pb-2 text-primary uppercase">
                {title}
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-2">
                <p className="break-words">{text}</p>

                <div className="flex flex-row gap-2">
                    <Button loading={confirmLoading} disabled={confirmLoading || cancelLoading} color={"primary"} size={"sm"} onClick={onConfirm}>
                        Yes
                    </Button>

                    <Button loading={cancelLoading} disabled={cancelLoading || confirmLoading} color={"error"} size={"sm"} onClick={onCancel}>
                        No
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}