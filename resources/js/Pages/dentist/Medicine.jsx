
import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layout/MainLayout.jsx";
import PageTitle from "@/components/atom/PageTitle.jsx";
import api from "@/lib/axios.js";
import { route } from "ziggy-js";
import Swal from "sweetalert2";

const initialForm = {
    name: "",
    description: "",
};

const Medicine = () => {

    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [form, setForm] = useState(initialForm);

    // Get all medicines
    const fetchMedicines = async () => {

        try {

            setIsLoading(true);

            const response = await api.get(
                route("getAllMedicine")
            );

            setMedicines(response.data ?? []);

        } catch (error) {

            console.error(
                "Load medicines error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Unable to load medicines",
                text: error.response?.data?.message ||
                    "Something went wrong.",
            });

        } finally {

            setIsLoading(false);

        }

    };

    useEffect(() => {
        fetchMedicines();
    }, []);


    // Search
    const filteredMedicines = useMemo(() => {

        const keyword = search.toLowerCase();

        return medicines.filter((item) => {

            return (
                item.name?.toLowerCase().includes(keyword) ||
                item.description?.toLowerCase().includes(keyword)
            );

        });

    }, [medicines, search]);


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

        setSelectedMedicine(null);
        setForm(initialForm);
        setShowModal(true);

    };


    // Open update modal
    const handleEdit = (medicine) => {

        setSelectedMedicine(medicine);

        setForm({
            name: medicine.name || "",
            description: medicine.description || "",
        });

        setShowModal(true);

    };


    // Close modal
    const closeModal = () => {

        if (isSaving) return;

        setShowModal(false);
        setSelectedMedicine(null);
        setForm(initialForm);

    };


    // Create / Update
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setIsSaving(true);

            if (selectedMedicine) {

                await api.put(
                    route("updateMedicine", {
                        id: selectedMedicine.id
                    }),
                    form
                );

                await Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Medicine updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            } else {

                await api.post(
                    route("createMedicine"),
                    form
                );

                setShowModal(false);

                await Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "New medicine created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            }

            setShowModal(false);
            setSelectedMedicine(null);
            setForm(initialForm);

            await fetchMedicines();

        } catch (error) {

            console.error(
                "Save medicine error:",
                error.response?.data || error.message
            );

            const errors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Failed to save",
                text: errors
                    ? Object.values(errors).flat().join("\n")
                    : error.response?.data?.message ||
                    "Unable to save medicine.",
            });

        } finally {

            setIsSaving(false);

        }

    };


    // Delete
    const handleDelete = async (medicine) => {

        const result = await Swal.fire({
            title: "Delete Medicine?",
            text: `Are you sure you want to delete "${medicine.name}"?`,
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
                route("deleteMedicine", {
                    id: medicine.id
                })
            );

            setMedicines(prev =>
                prev.filter(item => item.id !== medicine.id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Medicine deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            console.error(
                "Delete medicine error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: error.response?.data?.message ||
                    "Unable to delete medicine. It may be used in existing examination records.",
            });

        }

    };


    return (

        <MainLayout>

            <div className="w-full min-h-screen rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">

                <PageTitle title={"Medicine"} />

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 mb-5">
                    <div className="relative w-full">
                        <input type="text" placeholder="Search medicine..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="button" onClick={handleCreate} className="btn btn-primary">
                        Add Medicine
                    </button>
                </div>


                <div className="overflow-x-auto border border-gray-200 rounded-lg">

                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-5 py-4">No.</th>
                            <th className="px-5 py-4">Medicine Name</th>
                            <th className="px-5 py-4">Description</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">

                        {isLoading ? (

                            <tr>
                                <td colSpan="4" className="text-center py-8">
                                    Loading medicines...
                                </td>
                            </tr>

                        ) : filteredMedicines.length === 0 ? (

                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    No medicines found.
                                </td>
                            </tr>

                        ) : (

                            filteredMedicines.map((medicine, index) => (

                                <tr key={medicine.id}>

                                    <td className="px-5 py-4">
                                        {index + 1}
                                    </td>

                                    <td className="px-5 py-4 font-semibold">
                                        {medicine.name}
                                    </td>

                                    <td className="px-5 py-4">
                                        {medicine.description}
                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(medicine)}
                                                className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(medicine)}
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


                {/* ADD / EDIT MODAL */}
                {showModal && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                        <div className="bg-white rounded-xl w-full max-w-md p-6">

                            <h2 className="text-xl font-bold mb-5">

                                {selectedMedicine
                                    ? "Edit Medicine"
                                    : "Add Medicine"
                                }

                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* MEDICINE NAME */}
                                <div className="mb-4">

                                    <label className="block font-medium mb-2">
                                        Medicine Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter medicine name"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}
                                <div className="mb-5">

                                    <label className="block font-medium mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Enter medicine description"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="4"
                                        required
                                    />

                                </div>


                                {/* BUTTONS */}
                                <div className="flex justify-end gap-2">

                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        disabled={isSaving}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="btn btn-primary"
                                    >
                                        {isSaving
                                            ? "Saving..."
                                            : selectedMedicine
                                                ? "Update"
                                                : "Save"
                                        }
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

export default Medicine;
