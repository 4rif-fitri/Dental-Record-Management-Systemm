import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layout/MainLayout.jsx";
import PageTitle from "@/components/atom/PageTitle.jsx";
import TreatmentModal from "@/components/modal/TreatmentModal.jsx";
import Notreatmentsfound from "@/components/molecules/Treatment/NoTreamentsFound.jsx";
import Loadingtreatment from "@/components/molecules/Treatment/LoadingTreatment.jsx";
import ContentTreatment from "@/components/molecules/Treatment/ContentTreatment.jsx";
import api from "@/lib/axios.js";
import { route } from "ziggy-js";
import Swal from "sweetalert2";

const initialForm = {
    procedure_name: "",
    procedure_description: "",
    procedure_type: "Restorative",
};

const procedureTypes = [
    "Restorative",
    "Surgical",
    "Preventive",
    "Endodontic",
    "Periodontic",
    "Prosthodontic",
    "Orthodontic",
    "Observation",
];

const Treatments = () => {

    const [procedures, setProcedures] = useState([]);
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState(null);

    const [form, setForm] = useState(initialForm);

    // Get all procedures
    const fetchProcedures = async () => {

        try {

            setIsLoading(true);

            const response = await api.get(
                route("getAllProcedure")
            );

            setProcedures(response.data ?? []);

        } catch (error) {

            console.error(
                "Load procedures error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Unable to load treatments",
                text: error.response?.data?.message ||
                    "Something went wrong.",
            });

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {
        fetchProcedures();
    }, []);


    // Search
    const filteredProcedures = useMemo(() => {

        const keyword = search.toLowerCase();

        return procedures.filter((item) => {

            return (
                item.procedure_name?.toLowerCase().includes(keyword) ||
                item.procedure_description?.toLowerCase().includes(keyword) ||
                item.procedure_type?.toLowerCase().includes(keyword)
            );

        });

    }, [procedures, search]);


    // Handle input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // Open create modal
    const handleCreate = () => {

        setSelectedProcedure(null);
        setForm(initialForm);
        setShowModal(true);

    };


    // Open update modal
    const handleEdit = (procedure) => {

        setSelectedProcedure(procedure);

        setForm({
            procedure_name: procedure.procedure_name || "",
            procedure_description: procedure.procedure_description || "",
            procedure_type: procedure.procedure_type || "Restorative",
        });

        setShowModal(true);

    };


    // Close modal
    const closeModal = () => {

        if (isSaving) return;

        setShowModal(false);
        setSelectedProcedure(null);
        setForm(initialForm);

    };


    // Create / Update
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setIsSaving(true);

            if (selectedProcedure) {

                await api.put(
                    route("updateProcedure", {
                        id: selectedProcedure.id
                    }),
                    form
                );

                await Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Treatment updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            } else {

                await api.post(
                    route("createProcedure"),
                    form
                );

                setShowModal(false);

                await Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "New treatment created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            }

            setSelectedProcedure(null);
            setForm(initialForm);

            await fetchProcedures();

        } catch (error) {

            console.error(
                "Save procedure error:",
                error.response?.data || error.message
            );

            const errors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Failed to save",
                text: errors
                    ? Object.values(errors).flat().join("\n")
                    : error.response?.data?.message ||
                    "Unable to save treatment.",
            });

        } finally {

            setIsSaving(false);

        }

    };


    // Delete
    const handleDelete = async (procedure) => {

        const result = await Swal.fire({
            title: "Delete Treatment?",
            text: `Are you sure you want to delete "${procedure.procedure_name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(
                route("deleteProcedure", {
                    id: procedure.id
                })
            );

            setProcedures(prev =>
                prev.filter(item => item.id !== procedure.id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Treatment deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            console.error(
                "Delete procedure error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: error.response?.data?.message ||
                    "Unable to delete treatment. It may be used in existing dental records.",
            });

        }

    };

    return (

        <MainLayout>

            <div className="w-full min-h-screen rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">

                <PageTitle title={"Treatments"} />

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 mb-5">

                    <div className="relative w-full">

                        <input type="text" placeholder="Search treatment..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>
                    <button type="button" onClick={handleCreate} className="btn btn-primary">
                        Add Treatment
                    </button>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

                        <tr>
                            <th className="px-5 py-4">No.</th>
                            <th className="px-5 py-4">Treatment Name</th>
                            <th className="px-5 py-4">Description</th>
                            <th className="px-5 py-4">Type</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                        {isLoading ? (
                            <Loadingtreatment />
                        ) : filteredProcedures.length === 0 ? (
                            <Notreatmentsfound />
                        ) : (
                            filteredProcedures.map((procedure, index) => (
                                <ContentTreatment
                                    index={index}
                                    procedure={procedure}
                                    handleEdit={handleEdit} handleDelete={handleDelete}
                                />
                            ))

                        )}

                        </tbody>

                    </table>

                </div>


                {showModal && (
                    <TreatmentModal
                        selectedProcedure={selectedProcedure}
                        closeModal={closeModal}
                        handleChange={handleChange}
                        procedureTypes={procedureTypes}
                        isSaving={isSaving}
                        handleSubmit={handleSubmit}
                        form={form}
                    />
                )}

            </div>

        </MainLayout>

    );

};

export default Treatments;
