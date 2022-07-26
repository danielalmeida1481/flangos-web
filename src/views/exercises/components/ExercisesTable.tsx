import { AnnotationIcon, HashtagIcon, PencilAltIcon, TagIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Button, Table } from "react-daisyui";
import { IModalState } from "../../../common/types";
import ModalConfirm from "../../../components/ModalConfirm";
import ModalForm from "../../../components/ModalForm";
import ExerciseEditForm from "./ExerciseEditForm";

export default function ExercisesTable() {
    const [modalExerciseDeleteState, setModalExerciseDeleteState] = useState<IModalState>({});
    const [modalExerciseEditState, setModalExerciseEditState] = useState<IModalState>({});

    const HeadFooter = () => {
        return (
            <tr>
                <th><HashtagIcon className="w-5 h-5" /></th>

                <th>
                    <AnnotationIcon className="w-5 h-5 inline-flex mr-1" /><span>Name</span>
                </th>

                <th>
                    <TagIcon className="w-5 h-5 inline-flex mr-1" /><span>Category</span>
                </th>

                <th className="w-32"><span /></th>
            </tr>
        );
    }

    return (
        <>
            <ModalConfirm
                open={modalExerciseDeleteState.open}
                title="Delete Exercise"
                text="Are you sure you want to delete that exercise?"
                confirmLoading={modalExerciseDeleteState.confirmLoading}
                cancelLoading={modalExerciseDeleteState.cancelLoading}
                onConfirm={() => { setModalExerciseDeleteState(prev => ({...prev, confirmLoading: true}))}}
                onCancel={() => setModalExerciseDeleteState({open: false})} />

            <ModalForm 
                open={modalExerciseEditState.open}
                title="Edit Exercise"
                form={<ExerciseEditForm />}
                onClose={() => setModalExerciseEditState(prev => ({...prev, open: false}))}
                onSubmit={() => console.log('edit')}
                onError={() => console.log('edit error')} />

            <Table className="w-full">
                <thead><HeadFooter /></thead>

                <Table.Body>
                    <Table.Row>
                        <span>1</span>
                        <span>Ex. de peito</span>
                        <span>Peito</span>
                        <span className="flex flex-row gap-2">
                            <Button color={"primary"} size={"sm"} shape={"square"}>
                                <PencilAltIcon className="w-5 h-5" />
                            </Button>

                            <Button color={"error"} size={"sm"} shape={"square"}>
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </span>
                    </Table.Row>

                    <Table.Row>
                        <span>2</span>
                        <span>Ex. de braço</span>
                        <span>Braço</span>
                        <span className="flex flex-row gap-2">
                            <Button 
                                color={"primary"} 
                                size={"sm"} 
                                shape={"square"}
                                onClick={() => setModalExerciseEditState({open: true})}>
                                <PencilAltIcon className="w-5 h-5" />
                            </Button>

                            <Button 
                                color={"error"} 
                                size={"sm"} 
                                shape={"square"} 
                                onClick={() => { setModalExerciseDeleteState({open: true}) }}>
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </span>
                    </Table.Row>

                    <Table.Row>
                        <span>3</span>
                        <span>Squat</span>
                        <span>Perna</span>
                        <span className="flex flex-row gap-2">
                            <Button color={"primary"} size={"sm"} shape={"square"}>
                                <PencilAltIcon className="w-5 h-5" />
                            </Button>

                            <Button color={"error"} size={"sm"} shape={"square"}>
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </span>
                    </Table.Row>
                </Table.Body>

                <tfoot><HeadFooter /></tfoot>
            </Table>
        </>
    );
}