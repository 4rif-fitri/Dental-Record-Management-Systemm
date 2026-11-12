import React, { useState } from 'react';
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from "@/components/tooth/FourSurface.jsx";

const ToothProcedure = ({currentTooth, showToothProcedure, setShowToothProcedure }) => {

    console.log(currentTooth)

    const [view, setView] = useState("3D");
    const [toothView, setToothView] = useState("Surface");

    const [formData, setFormData] = useState({
        condition: "",
        treatment: "",
        notes: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        console.log({
            view,
            toothView,
            ...formData
        });

        setShowToothProcedure(false);
    };

    if (!showToothProcedure) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-black">

            <div className="w-[95vw] lg:w-[50vw] max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-xl">

                {/* Header */}
                <div className="mb-4 flex flex-wrap justify-between items-center">

                    <h2 className="font-bold text-3xl">
                        Tooth Procedure
                    </h2>

                    <button
                        onClick={() => setShowToothProcedure(false)}
                        className="btn w-24"
                    >
                        Close
                    </button>

                </div>

                {/* Tooth Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Left - 3D Tooth */}
                    <div className="border-2 border-gray-300 p-2">

                        <div className="relative flex justify-center items-center h-[350px] bg-gray-100">
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="text-gray-400">
                                    3D Tooth Model
                                </span>
                            </div>
                            {/* View Buttons */}
                            <div className="absolute bottom-2 left-2 flex gap-1">

                                <button
                                    type="button"
                                    onClick={() => setToothView("Surface")}
                                    className={`border-2 border-black rounded-lg px-5 py-1 ${
                                        toothView === "Surface"
                                            ? "bg-blue-200"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    Surface
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setToothView("Cross-Section")}
                                    className={`border-2 border-black rounded-lg px-5 py-1 ${
                                        toothView === "Cross-Section"
                                            ? "bg-blue-200"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    Cross-Section
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="border-2 border-gray-300 flex justify-center items-center p-5 min-h-[350px]">
                        { currentTooth.numberOfsurface === 5 ? <FiveSurface /> : <FourSurface /> }
                    </div>

                </div>

                {/* Form */}
                <form onSubmit={handleSave}>

                    <div className="flex flex-col gap-4">

                        {/* Condition */}
                        <div>
                            <label className="text-2xl font-medium">
                                Condition
                            </label>

                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full h-12 border-2 border-gray-300 px-3 bg-white outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Condition</option>
                                <option value="Dental Caries">Dental Caries</option>
                                <option value="Fracture">Fracture</option>
                                <option value="Discoloration">Discoloration</option>
                                <option value="Missing Tooth">Missing Tooth</option>
                                <option value="Normal">Normal</option>
                            </select>
                        </div>

                        {/* Treatment */}
                        <div>
                            <label className="text-2xl font-medium">
                                Treatment
                            </label>

                            <select
                                name="treatment"
                                value={formData.treatment}
                                onChange={handleChange}
                                className="w-full h-12 border-2 border-gray-300 px-3 bg-white outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Select Treatment</option>
                                <option value="Filling">Filling</option>
                                <option value="Extraction">Extraction</option>
                                <option value="Root Canal Treatment">Root Canal Treatment</option>
                                <option value="Scaling">Scaling</option>
                                <option value="Crown">Crown</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-2xl font-medium">
                                Notes
                            </label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full h-36 border-2 border-gray-300 p-3 outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                    </div>

                    {/* Save */}
                    <button
                        type="submit"
                        className="w-full mt-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xl"
                    >
                        Save
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ToothProcedure;
