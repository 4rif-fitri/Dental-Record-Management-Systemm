
import React from 'react';
import BoxFiveSurface from "./tooth/box/BoxFiveSurfacee";
import BoxFourSurfacee from "./tooth/box/BoxFourSurfacee";

const BoxCondition = ({ procedure, updateProcedureStatus, setShowUpdateToothProcedure, setCurrentToothFinding }) => {

    const handleViewDetail = () => {
        console.log(procedure)
        setShowUpdateToothProcedure(true)
        setCurrentToothFinding(procedure)
    }

    return (
        <div className="border border-gray-300 p-2">

            <div className="grid grid-cols-1 p-2">

                <div className="py-10 flex justify-center items-center">
                    {procedure.tooth?.number_of_surface === 5 ? (
                        <BoxFiveSurface currentTooth={procedure} />
                    ) : (
                        <BoxFourSurfacee currentTooth={procedure} />
                    )}
                </div>

                <div className="p-2">

                    <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
                        <h1>Tooth:</h1>
                        <p className="font-semibold rounded">
                            {procedure.tooth?.tooth_number} - {procedure.tooth?.tooth_name}
                        </p>
                    </div>

                    <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
                        <h1>Condition:</h1>
                        <p className="font-semibold rounded">
                            {procedure.condition?.condition_name}
                        </p>
                    </div>

                    <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
                        <h1>Treatment:</h1>
                        <p className="font-semibold rounded">
                            {procedure.procedure?.procedure_name}
                        </p>
                    </div>

                    <div className="mb-2 grid grid-cols-1 sm:grid-cols-2">
                        <h1>Status:</h1>
                        <p className="font-semibold rounded">
                            {procedure.status}
                        </p>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1">
                <div></div>

                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleViewDetail}
                >
                    View Detail
                </button>
            </div>

            {procedure.status === "Planning" && (
                <div className="grid grid-cols-2 gap-2 p-1">
                    <div></div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => updateProcedureStatus(procedure.id, "In Progress")}
                    >
                        In Progress
                    </button>
                </div>
            )}

            {procedure.status === "In Progress" && (
                <div className="grid grid-cols-2 gap-2 p-1">

                    <button type="button" className="btn btn-primary"
                        onClick={() => updateProcedureStatus(procedure.id, "Planning")}>
                        Planning
                    </button>

                    <button type="button" className="btn btn-primary"
                        onClick={() => updateProcedureStatus(procedure.id, "Completed")}>
                        Completed
                    </button>

                </div>
            )}

            {procedure.status === "Completed" && (
                <div className="grid grid-cols-2 gap-2 p-1">

                    <button type="button" className="btn btn-primary"
                        onClick={() => updateProcedureStatus(procedure.id, "In Progress")}>
                        In Progress
                    </button>

                    <div></div>

                </div>
            )}

        </div>
    );
};

export default BoxCondition;
