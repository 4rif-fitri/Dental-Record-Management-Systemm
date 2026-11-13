import React, {useEffect, useState} from 'react';
import FiveSurfacee from "@/components/tooth/FiveSurfacee.jsx";
import FourSurfacee from "@/components/tooth/FourSurfacee.jsx";
import api from '@/lib/axios';
import Swal from "sweetalert2";

const ToothProcedure = ({patientDetails, setShowToothProcedure,currentTooth,setCurrentTooth, conditions,treatment, surfaces}) => {
    const [selectedCondition, setSelectedCondition] = useState({});
    const [selectedTreatment, setSelectedTreatment] = useState({});

    const selectedSurfaceIds = currentTooth.selected_surfaces.map(name => {
        return surfaces.find(surface => surface.surface_name === name)?.id;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            patient_id: patientDetails.id,
            procedure_id: selectedTreatment.id,
            condition_id: selectedCondition.id,
            tooth_id: currentTooth.id,
            status: "Planning",
            selectedSurfaceIds: selectedSurfaceIds,
            finding_description: "asd"
        };

        try {
            const response = await api.post(
                "/toothFinding/store",
                jsonData,
            );

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Finding saved successfully!',
            });

            hanleCloseModal();
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unable to connect to server.'
            });

        }
    };

    const hanleCloseModal = () => {
        setCurrentTooth("");
        setShowToothProcedure(false);
    };

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

    useEffect(()=>{
        console.log(currentTooth)
    },[currentTooth])

    if (!currentTooth) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-black">

            <div className="w-[95vw] lg:w-[75vw] max-w-8xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-xl">
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
                        <div className="relative flex justify-center items-center h-60 bg-gray-100">
                        </div>
                        <div className={"grid grid-cols-2 mt-2 gap-2"}>
                            <button className={"btn btn-outline"}>Surface</button>
                            <button className={"btn btn-outline"}>Cross Section</button>
                        </div>
                    </div>

                    <div className="border-2 border-gray-300 flex flex-col justify-center items-center p-5 min-h-60">
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

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">

                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                            <div>
                                <label className="text-2xl font-medium">Condition</label>
                                <select name="condition" className="w-full h-12 border-2 border-gray-300 px-3 bg-white"
                                    value={selectedCondition.id ?? ""}
                                    onChange={(e) => {
                                        const id = e.target.value;
                                        const selected = conditions.find(item => String(item.id) === id);
                                        setSelectedCondition(selected || {});
                                    }} required>

                                    <option value="">Select Condition</option>

                                    {conditions.map((data) => (
                                        <option key={data.id} value={data.id}>
                                            {data.condition_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-2xl font-medium">Treatment</label>
                                <select name="treatment" className="w-full h-12 border-2 border-gray-300 px-3 bg-white"
                                    value={selectedTreatment.id ?? ""}
                                    onChange={(e) => {
                                        const id = e.target.value;
                                        const selected = treatment.find(item => String(item.id) === id);
                                        setSelectedTreatment(selected || {});
                                    }} required>

                                    <option value="">Select Treatment</option>

                                    {treatment.map((data) => (
                                        <option key={data.id} value={data.id}>
                                            {data.procedure_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-2xl font-medium">Notes</label>
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
