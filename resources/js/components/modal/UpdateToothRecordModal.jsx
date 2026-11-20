
import React, { useEffect, useState } from 'react';
import FiveSurfacee from "@/components/tooth/FiveSurfacee.jsx";
import FourSurfacee from "@/components/tooth/FourSurfacee.jsx";
import api from "@/lib/axios.js";
import Swal from "sweetalert2";
import { route } from "ziggy-js";

const UpdateToothRecordModal = ({
    setShowUpdateToothProcedure,
    currentToothFinding,conditions, treatment,
    surfaces, laodToothFinding, surfaceCondition
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
            (currentToothFinding.surfaces || []).map(item => ({
                surface_id: item.surface_id,
                surface_name: item.surface?.surface_name,
                surface_condition_id: item.surface_condition_id,
                surface_condition: item.surface_condition
            }))
        );

    }, [currentToothFinding, conditions, treatment]);

    const handleSurfaceSelect = (surfaceId, conditionId) => {

        setSelectedSurfaces(prev => {

            // Remove surface if user selects empty option
            if (!conditionId) {
                return prev.filter(
                    item => Number(item.surface_id) !== Number(surfaceId)
                );
            }

            const selectedCondition = surfaceCondition.find(
                item => Number(item.id) === Number(conditionId)
            );

            const selectedSurface = surfaces.find(
                item => Number(item.id) === Number(surfaceId)
            );

            const newData = {
                surface_id: Number(surfaceId),
                surface_name: selectedSurface?.surface_name,
                surface_condition_id: Number(conditionId),
                surface_condition: selectedCondition
            };

            const exists = prev.some(
                item => Number(item.surface_id) === Number(surfaceId)
            );

            if (exists) {
                return prev.map(item =>
                    Number(item.surface_id) === Number(surfaceId)
                        ? newData
                        : item
                );
            }

            return [...prev, newData];

        });

    };

    const selectedSurfaceIds = selectedSurfaces.map(item => ({
        surface_id: item.surface_id,
        surface_condition_id: item.surface_condition_id
    }));

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
                finding_description: notes ?? "",

                selectedSurfaceIds: selectedSurfaces.map(item => ({
                    surface_id: item.surface_id,
                    surface_condition_id: item.surface_condition_id
                }))
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

            <div className="w-[95vw] lg:w-[50vw] max-w-8xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-xl">

                <div className="mb-4 flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-3xl">
                        Update Tooth Record
                    </h2>
                    <button type="button" onClick={handleCloseModal}
                        className="btn bg-black text-white w-24">
                        Close
                    </button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 mb-8">
                    <h1 className={"font-semibold"}>Tooth Detail</h1>
                    <h1 className={"font-semibold"}>Surface Condition</h1>

                    <div className="p-2 flex gap-2 flex-col w-full">
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Tooth Name</td>
                                    <td>{currentToothFinding.tooth.tooth_name}</td>
                                </tr>
                                <tr>
                                    <td>Tooth Number</td>
                                    <td>{currentToothFinding.tooth.tooth_number}</td>
                                </tr>
                                <tr>
                                    <td>Tooth Type</td>
                                    <td>{currentToothFinding.tooth.tooth_type}</td>
                                </tr>
                                <tr>
                                    <td>Tooth Jaw</td>
                                    <td>{currentToothFinding.tooth.jaw}</td>
                                </tr>
                                <tr>
                                    <td>Tooth Quadrant</td>
                                    <td>{currentToothFinding.tooth.quadrant}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="border-2 border-gray-300 flex flex-col justify-center items-center p-5 min-h-60">

                        {tooth?.number_of_surface === 5 ? (
                            <FiveSurfacee
                                currentTooth={{...tooth, selected_surfaces: selectedSurfaces}}
                                onSelect={handleSurfaceSelect}
                                skala={"200"}
                                surfaceCondition={surfaceCondition}
                                selectedSurface={selectedSurfaces}
                            />
                        ) : (
                            <FourSurfacee
                                currentTooth={{...tooth,selected_surfaces: selectedSurfaces}}
                                onSelect={handleSurfaceSelect}
                                skala={"200"}
                                surfaceCondition={surfaceCondition}
                                selectedSurface={selectedSurfaces}
                            />
                        )}

                    </div>

                </div>


                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <div className={"grid grid-cols-1 md:grid-cols-1 gap-4"}>
                            <div>
                                <label className="text-2xl font-medium">Tooth Condition</label>
                                <select name="condition"
                                    className="w-full select"
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
                                            {data.condition_code} - {data.condition_name}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div>
                                <label className="text-2xl font-medium">Treatment</label>
                                <select name="treatment"
                                    className="w-full select"
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
                            className="btn btn-error"
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
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
