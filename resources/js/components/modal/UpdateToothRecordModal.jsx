
import React, { useEffect, useState } from 'react';
import FiveSurfacee from "@/components/tooth/FiveSurfacee.jsx";
import FourSurfacee from "@/components/tooth/FourSurfacee.jsx";
import api from "@/lib/axios.js";
import Swal from "sweetalert2";
import { route } from "ziggy-js";

const UpdateToothRecordModal = ({
    setShowUpdateToothProcedure,
    currentToothFinding,conditions, treatment,
    surfaces, laodToothFinding
}) => {

    const [selectedCondition, setSelectedCondition] = useState({});
    const [selectedTreatment, setSelectedTreatment] = useState({});
    const [selectedSurfaces, setSelectedSurfaces] = useState([]);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        const result = await Swal.fire({
            icon: "warning",
            title: "Delete Finding?",
            text: "Are you sure you want to delete this tooth finding?",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;

        try {

            setLoading(true);

            await api.delete(
                route("deleteFinding", {
                    id: currentToothFinding.id
                })
            );

            await Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Tooth finding deleted successfully."
            });

            setShowUpdateToothProcedure(false);
            laodToothFinding()

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to delete finding."
            });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (!currentToothFinding) return;

        setSelectedCondition(
            conditions.find(
                item => Number(item.id) === Number(currentToothFinding.condition_id)
            ) || {}
        );

        setSelectedTreatment(
            treatment.find(
                item => Number(item.id) === Number(currentToothFinding.procedure_id)
            ) || {}
        );

        setNotes(currentToothFinding.finding_description || "");

        setSelectedSurfaces(
            (currentToothFinding.surfaces || []).map(
                item => item.surface?.surface_name
            ).filter(Boolean)
        );

    }, [currentToothFinding, conditions, treatment]);

    const handleSurfaceSelect = (surface) => {

        setSelectedSurfaces(prev => {

            return prev.includes(surface)
                ? prev.filter(item => item !== surface)
                : [...prev, surface];

        });

    };

    const selectedSurfaceIds = selectedSurfaces.map(name => {

        return surfaces.find(
            surface => surface.surface_name === name
        )?.id;

    }).filter(Boolean);

    const handleCloseModal = () => {
        setShowUpdateToothProcedure(false);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedCondition.id || !selectedTreatment.id) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please select condition and treatment.'
            });
            return;
        }

        try {

            setLoading(true);

            const jsonData = {
                condition_id: selectedCondition.id,
                procedure_id: selectedTreatment.id,
                finding_description: notes,
                selectedSurfaceIds: selectedSurfaceIds
            };

            const response = await api.put(
                route("updateFinding", {
                    id: currentToothFinding.id
                }),
                jsonData
            );

            console.log(response.data);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Finding updated successfully!'
            });

            laodToothFinding()
            setShowUpdateToothProcedure(false);

        } catch (error) {

            console.log(error.response);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message ||
                    'Unable to update finding.'
            });

        } finally {
            setLoading(false);
        }

    };

    if (!currentToothFinding) return null;

    const tooth = currentToothFinding.tooth;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 text-black">

            <div className="w-[95vw] lg:w-[75vw] max-w-8xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-xl">

                <div className="mb-4 flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-3xl">
                        Update Tooth Treatment
                    </h2>
                    <button type="button" onClick={handleCloseModal}
                        className="btn bg-black text-white w-24">
                        Close
                    </button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    <div className="border-2 border-gray-300 p-2">

                        <div className="relative flex justify-center items-center h-60 bg-gray-100">

                        </div>

                        <div className={"grid grid-cols-2 mt-2 gap-2"}>
                            <button type="button" className={"btn btn-outline"}>
                                Surface
                            </button>
                            <button type="button" className={"btn btn-outline"}>
                                Cross Section
                            </button>
                        </div>

                    </div>


                    <div className="border-2 border-gray-300 flex flex-col justify-center items-center p-5 min-h-60">

                        {tooth?.number_of_surface === 5 ? (
                            <FiveSurfacee
                                currentTooth={{...tooth, selected_surfaces: selectedSurfaces}}
                                onSelect={handleSurfaceSelect}
                                skala={"200"}
                            />
                        ) : (
                            <FourSurfacee
                                currentTooth={{...tooth,selected_surfaces: selectedSurfaces}}
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
                                <select name="condition"
                                    className="w-full h-12 border-2 border-gray-300 px-3 bg-white"
                                    value={selectedCondition.id ?? ""}
                                    onChange={(e) => {
                                        const id = e.target.value;
                                        const selected = conditions.find(
                                            item => String(item.id) === id
                                        );
                                        setSelectedCondition(selected || {});
                                    }} required>

                                    <option value="">
                                        Select Condition
                                    </option>
                                    {conditions.map((data) => (
                                        <option key={data.id} value={data.id}>
                                            {data.condition_name}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div>
                                <label className="text-2xl font-medium">Treatment</label>
                                <select name="treatment"
                                    className="w-full h-12 border-2 border-gray-300 px-3 bg-white"
                                    value={selectedTreatment.id ?? ""}
                                    onChange={(e) => {
                                        const id = e.target.value;
                                        const selected = treatment.find(
                                            item => String(item.id) === id
                                        );
                                        setSelectedTreatment(selected || {});
                                    }} required>

                                    <option value="">
                                        Select Treatment
                                    </option>

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

                            <textarea name="notes" value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full h-36 border-2 border-gray-300 p-3 outline-none focus:border-blue-500 resize-none"
                            />

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">

                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleDelete}
                            className="w-full mt-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xl disabled:opacity-50"
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xl disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateToothRecordModal;
