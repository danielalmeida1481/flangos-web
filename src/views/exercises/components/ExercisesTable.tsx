import { AnnotationIcon, HashtagIcon, PencilAltIcon, TagIcon, TrashIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-daisyui";
import { IModalState, ITable } from "../../../common/types";
import ModalConfirm from "../../../components/ModalConfirm";
import ModalForm from "../../../components/ModalForm";
import apiExercise from "../../../services/api/exercise";
import { IExercise } from "../../../services/api/models";
import ExerciseEditForm from "./ExerciseEditForm";

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

export default function ExercisesTable({ update, setUpdate }: ITable) {
    const [modalExerciseDeleteState, setModalExerciseDeleteState] = useState<IModalState>({});
    const [modalExerciseEditState, setModalExerciseEditState] = useState<IModalState>({});

    const [exercises, setExercises] = useState<IExercise[] | []>([]);

    const [deleteId, setDeleteId] = useState(-1);
    const [editId, setEditId] = useState(-1);

    useEffect(() => {
        updateTable();
    }, []);

    useEffect(() => {
        if (update) {
            setUpdate(false);
            updateTable();
        }
    }, [update, setUpdate]);

    function updateTable() {
        apiExercise.get?.()
        .then(({ data }) => {
            setExercises(data);
        })
    }

    function deleteExercise() {
        setModalExerciseDeleteState(prev => ({ ...prev, confirmLoading: true }));

        apiExercise.remove?.(deleteId)
        .then(() => {
            updateTable();
        })
        .finally(() => {
            setModalExerciseDeleteState({ open: false });
            setDeleteId(-1);
        });
    }

    return (
        <>
            <ModalConfirm
                open={modalExerciseDeleteState.open}
                title="Delete Exercise"
                text="Are you sure you want to delete that exercise?"
                confirmLoading={modalExerciseDeleteState.confirmLoading}
                cancelLoading={modalExerciseDeleteState.cancelLoading}
                onConfirm={() => { 
                    deleteExercise();
                }}
                onCancel={() => {
                    setModalExerciseDeleteState({ open: false });
                }}
            />

            <ModalForm
                open={modalExerciseEditState.open}
                title="Edit Exercise"
                form={
                    <ExerciseEditForm id={editId} />
                }
                onClose={() => {
                    setModalExerciseEditState(prev => ({...prev, open: false}));
                    setEditId(-1);
                }}
                onSubmit={() => {
                    setModalExerciseEditState({open: false});
                    setEditId(-1);
                    setUpdate(true);
                }}
                onError={() => console.log('edit error')} />

            <Table className="w-full">
                <thead><HeadFooter /></thead>

                <Table.Body>
                    {
                        exercises.map((exercise, index) => {
                            return (
                                <Table.Row key={index}>
                                    <span>{index + 1}</span>
                                    <span>{exercise.name}</span>
                                    <span>{exercise.category?.name}</span>
                                    <span className="flex flex-row gap-2">
                                        <Button
                                            color={"primary"}
                                            size={"sm"}
                                            shape={"square"}
                                            onClick={() => {
                                                setEditId(exercise.id);
                                                setModalExerciseEditState({ open: true });
                                            }
                                        }>
                                            <PencilAltIcon className="w-5 h-5" />
                                        </Button>

                                        <Button
                                            color={"error"}
                                            size={"sm"}
                                            shape={"square"}
                                            onClick={() => {
                                                setDeleteId(exercise.id);
                                                setModalExerciseDeleteState({ open: true });
                                            }}>
                                            <TrashIcon className="w-5 h-5" />
                                        </Button>
                                    </span>
                                </Table.Row>
                            );
                        })
                    }
                </Table.Body>

                <tfoot><HeadFooter /></tfoot>
            </Table>
        </>
    );
}