import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layout/MainLayout.jsx";
import PageTitle from "@/components/layout/PageTitle.jsx";
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

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 mb-5">

                    {/* Search */}
                    <div className="relative w-full sm:w-80">

                        <input
                            type="text"
                            placeholder="Search treatment..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Add Button */}
                    <button
                        type="button"
                        onClick={handleCreate}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                    >
                        <span className="text-lg">+</span>
                        Add Treatment
                    </button>

                </div>

                {/* Count */}
                <div className="flex justify-between items-center mb-3">

                    <p className="text-sm text-gray-500">
                        Total Treatments:{" "}
                        <span className="font-semibold text-gray-800">
                            {procedures.length}
                        </span>
                    </p>

                </div>


                {/* Table */}
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

                            <tr>
                                <td colSpan="5" className="py-16 text-center">

                                    <div className="flex flex-col items-center gap-3">

                                        <div className="w-9 h-9 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />

                                        <p className="text-sm text-gray-500">
                                            Loading treatments...
                                        </p>

                                    </div>

                                </td>
                            </tr>

                        ) : filteredProcedures.length === 0 ? (

                            <tr>
                                <td colSpan="5" className="py-16 text-center">

                                    <p className="font-medium text-gray-700">
                                        No treatments found
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Add a new treatment or try another search.
                                    </p>

                                </td>
                            </tr>

                        ) : (

                            filteredProcedures.map((procedure, index) => (

                                <tr
                                    key={procedure.id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    <td className="px-5 py-4 text-gray-500">
                                        {index + 1}
                                    </td>

                                    <td className="px-5 py-4">

                                            <span className="font-medium text-gray-800">
                                                {procedure.procedure_name}
                                            </span>

                                    </td>

                                    <td className="px-5 py-4 text-gray-600 max-w-sm">
                                        {procedure.procedure_description}
                                    </td>

                                    <td className="px-5 py-4">

                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold`}>
                                                {procedure.procedure_type}
                                            </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(procedure)}
                                                className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(procedure)}
                                                className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                        </tbody>

                    </table>

                </div>


                {/* Create / Update Modal */}
                {showModal && (

                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

                        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">

                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {selectedProcedure
                                            ? "Update Treatment"
                                            : "Create Treatment"}
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Manage dental treatment information.
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-700 text-2xl"
                                >
                                    &times;
                                </button>

                            </div>


                            {/* Form */}
                            <form onSubmit={handleSubmit}>

                                <div className="p-6 space-y-4">

                                    {/* Name */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Treatment Name
                                        </label>

                                        <input
                                            type="text"
                                            name="procedure_name"
                                            value={form.procedure_name}
                                            onChange={handleChange}
                                            placeholder="e.g. Dental Filling"
                                            maxLength={100}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>

                                    {/* Type */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Treatment Type
                                        </label>

                                        <select
                                            name="procedure_type"
                                            value={form.procedure_type}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        >

                                            {procedureTypes.map(type => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </option>

                                            ))}

                                        </select>

                                    </div>

                                    {/* Description */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Description
                                        </label>

                                        <textarea
                                            name="procedure_description"
                                            value={form.procedure_description}
                                            onChange={handleChange}
                                            placeholder="Describe the dental treatment..."
                                            maxLength={255}
                                            rows={3}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />

                                        <p className="text-xs text-gray-400 text-right mt-1">
                                            {form.procedure_description.length}/255
                                        </p>

                                    </div>





                                </div>


                                {/* Footer */}
                                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">



                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium disabled:opacity-50"
                                    >
                                        {isSaving
                                            ? "Saving..."
                                            : selectedProcedure
                                                ? "Update Treatment"
                                                : "Create Treatment"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </MainLayout>

    );

};

export default Treatments;
