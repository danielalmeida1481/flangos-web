import Div from "../../components/Div";
import NavBar from "../../components/NavBar";
import ExercisesTable from "./components/ExercisesTable";
import { Button } from "react-daisyui";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { IModalState } from "../../common/types";
import ModalForm from "../../components/ModalForm";
import ExerciseCreateForm from "./components/ExerciseCreateForm";

export default function Exercises() {
    const [modalExerciseCreateState, setModalExerciseCreateState] = useState<IModalState>({});

    return (
        <>
            <NavBar activePage="exercises" />

            <div className="container mx-auto p-2 flex flex-col gap-2">
                <Div title="Exercises">
                    <div className="w-full">
                        <Button 
                            className="flex flex-row gap-1" 
                            color={"primary"} 
                            onClick={() => setModalExerciseCreateState(prev => ({...prev, open: true}))}>
                            <span className="normal-case">Create</span><PlusCircleIcon className="w-5 h-5" />
                        </Button>

                        <ModalForm 
                            open={modalExerciseCreateState.open} 
                            title="Create Exercise" 
                            form={<ExerciseCreateForm/>}
                            onClose={() => setModalExerciseCreateState(prev => ({...prev, open: false}))}
                            onSubmit={() => console.log('create')}
                            onError={() => console.log('create error')} />
                    </div>

                    <div className="w-full overflow-x-auto">
                        <ExercisesTable />
                    </div>
                </Div>
            </div>
        </>
    );
}