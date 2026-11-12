import React from 'react';
import FiveSurfacee from "@/components/tooth/FiveSurfacee.jsx";
import FourSurfacee from "@/components/tooth/FourSurfacee.jsx";

const ToothProcedure = ({showToothProcedure,setShowToothProcedure,currentTooth,setCurrentTooth}) => {

    const hanleCloseModal = () => {
        setCurrentTooth("")
        setShowToothProcedure(false)
    }

    const handleSurfaceSelect = (surface) => {
        setCurrentTooth(prev => {
            if (!prev) return prev;

            const selected = prev.selected_surfaces || [];

            const updated = selected.includes(surface)
                ? selected.filter(item => item !== surface)
                : [...selected, surface];

            return {
                ...prev,
                selected_surfaces: updated
            };
        });
    };

    if (!currentTooth) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-black">

            <div className="w-[95vw] lg:w-[50vw] max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-xl">

                <div className="mb-4 flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-3xl">
                        Tooth Treatment
                    </h2>

                    <button onClick={hanleCloseModal} className="btn bg-black text-white w-24">
                        Close
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    <div className="border-2 border-gray-300 p-2">
                        <div className="relative flex justify-center items-center h-87.5 bg-gray-100">
                            <span className="text-gray-400">
                                3D Tooth Model
                            </span>
                        </div>
                    </div>

                    <div className="border-2 border-gray-300 flex flex-col justify-center items-center p-5 min-h-87.5">

                        {currentTooth.number_of_surface === 5 ? (
                            <FiveSurfacee
                                currentTooth={currentTooth}
                                onSelect={handleSurfaceSelect}
                                skala={"200"}
                            />
                        ) : (
                            <FourSurfacee
                                currentTooth={currentTooth}
                                onSelect={handleSurfaceSelect}
                                skala={"200"}
                            />
                        )}

                    </div>
                </div>

                <form>
                    <div className="flex flex-col gap-4">

                        <div>
                            <label className="text-2xl font-medium">
                                Condition
                            </label>

                            <select name="condition" className="w-full h-12 border-2 border-gray-300 px-3 bg-white outline-none focus:border-blue-500"  required>
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

                            <select name="treatment" className="w-full h-12 border-2 border-gray-300 px-3 bg-white outline-none focus:border-blue-500"  required>
                                <option value="">Select Treatment</option>
                                <option value="Filling">Filling</option>
                                <option value="Extraction">Extraction</option>
                                <option value="Root Canal Treatment">Root Canal Treatment</option>
                                <option value="Scaling">Scaling</option>
                                <option value="Crown">Crown</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-2xl font-medium">
                                Notes
                            </label>

                            <textarea name="notes" className="w-full h-36 border-2 border-gray-300 p-3 outline-none focus:border-blue-500 resize-none"/>
                        </div>

                    </div>

                    <button type="submit" className="w-full mt-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xl">
                        Save
                    </button>

                </form>

            </div>
        </div>
    );
};

export default ToothProcedure;
