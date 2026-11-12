import React from 'react'
import FiveSurface from './tooth/FiveSurface';
import FourSurface from './tooth/FourSurface';

const BoxCondition = ({ procedure, onSelect, updateProcedureStatus }) => {
    return (
        <div className="border-1 border-gray-300 p-2">
            <div className="grid grid-cols-1 grid-rows-1">
                <div className="p-2 flex justify-center items-center">
                    {procedure.typeTooth === "Molar" ? (
                        <FiveSurface />
                    ) : (
                        <FourSurface />
                    )}
                </div>

                <div className="p-2">
                    <div className=" mb-2">
                        <h1>Tooth:</h1>
                        <p className="font-semibold border border-gray-400 p-2 rounded-2">
                            {procedure.tooth}
                        </p>
                    </div>

                    <div className=" mb-2">
                        <h1>Condition:</h1>
                        <p className="font-semibold border border-gray-400 p-2 rounded-2">
                            {procedure.condition}
                        </p>
                    </div>
                    <div className="mb-2">
                        <h1>Treatment:</h1>
                        <p className="font-semibold border border-gray-400 p-2 rounded-2">
                            {procedure.treatment}
                        </p>
                    </div>
                    <div className="">
                        <button
                            className="w-full btn-soft btn-primary border p-1.5 rounded cursor-pointer"
                            onClick={onSelect}
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>

            {procedure.status === "Planning" && (
                <div className=" grid grid-cols-2 gap-2 p-1">
                    <div></div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            updateProcedureStatus(procedure.id, "In Progress")
                        }
                    >
                        In Progress
                    </button>
                </div>
            )}

            {procedure.status === "In Progress" && (
                <div className=" grid grid-cols-2 gap-2 p-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            updateProcedureStatus(procedure.id, "Planning")
                        }
                    >
                        Planning
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            updateProcedureStatus(procedure.id, "Completed")
                        }
                    >
                        Completed
                    </button>
                </div>
            )}

            {procedure.status === "Completed" && (
                <div className=" grid grid-cols-2 gap-2 p-1">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            updateProcedureStatus(procedure.id, "In Progress")
                        }
                    >
                        In Progress
                    </button>

                    <div></div>
                </div>
            )}
        </div>
    );
};

export default BoxCondition
