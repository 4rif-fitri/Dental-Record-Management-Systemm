
import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layout/MainLayout.jsx";
import PageTitle from "@/components/atom/PageTitle.jsx";
import ToothConditionModal from "@/components/modal/ToothConditionModal.jsx";
import NoConditionsFound from "@/components/molecules/ToothCondition/NoConditionsFound.jsx";
import LoadingCondition from "@/components/molecules/ToothCondition/LoadingCondition.jsx";
import ContentCondition from "@/components/molecules/ToothCondition/ContentCondition.jsx";
import api from "@/lib/axios.js";
import { route } from "ziggy-js";
import Swal from "sweetalert2";

const colorPresets = [
    { name: "Red", color: "bg-red-500", hex: "#EF4444" },
    { name: "Blue", color: "bg-blue-500", hex: "#3B82F6" },
    { name: "Green", color: "bg-green-500", hex: "#22C55E" },
    { name: "Yellow", color: "bg-yellow-500", hex: "#EAB308" },
    { name: "Purple", color: "bg-purple-500", hex: "#A855F7" },
    { name: "Pink", color: "bg-pink-500", hex: "#EC4899" },
    { name: "Orange", color: "bg-orange-500", hex: "#F97316" },
    { name: "Gray", color: "bg-gray-500", hex: "#6B7280" },
    { name: "Teal", color: "bg-teal-500", hex: "#14B8A6" },
    { name: "Indigo", color: "bg-indigo-500", hex: "#6366F1" },
    { name: "Cyan", color: "bg-cyan-500", hex: "#06B6D4" },
    { name: "Lime", color: "bg-lime-500", hex: "#84CC16" },
];

const initialForm = {
    condition_name: "",
    condition_code: "",
    color: "bg-red-500",
    color_code: "#EF4444",
};

const ToothConditions = () => {

    const [conditions, setConditions] = useState([]);
    const [search, setSearch] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(null);

    const [form, setForm] = useState(initialForm);

    const getResponseData = (response) => {
        return response?.data?.data ?? response?.data ?? [];
    };

    const fetchConditions = async () => {
        try {
            setIsLoading(true);

            const response = await api.get(
                route("getAllCondition")
            );

            const data = getResponseData(response);

            setConditions(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error(
                "Failed to load conditions:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Unable to load conditions",
                text: error.response?.data?.message ||
                    "Something went wrong while loading conditions.",
            });

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConditions();
    }, []);

    // Search
    const filteredConditions = useMemo(() => {

        return conditions.filter((item) => {

            const keyword = search.toLowerCase();

            return (
                item.condition_name?.toLowerCase().includes(keyword) ||
                item.condition_code?.toLowerCase().includes(keyword)
            );

        });

    }, [conditions, search]);

    // Handle form input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    // Select preset color
    const handleSelectColor = (preset) => {

        setForm(prev => ({
            ...prev,
            color: preset.color,
            color_code: preset.hex
        }));

    };

    // Select custom HEX color
    const handleCustomColor = (e) => {

        const hex = e.target.value;

        setForm(prev => ({
            ...prev,
            color: "custom",
            color_code: hex
        }));

    };

    // Open create modal
    const handleCreate = () => {

        setSelectedCondition(null);
        setForm(initialForm);
        setShowModal(true);

    };

    // Open update modal
    const handleEdit = (condition) => {

        setSelectedCondition(condition);

        setForm({
            condition_name: condition.condition_name || "",
            condition_code: condition.condition_code || "",
            color: condition.color || "bg-red-500",
            color_code: condition.color_code || "#EF4444",
        });

        setShowModal(true);

    };

    // Close modal
    const closeModal = () => {

        if (isSaving) return;

        setShowModal(false);
        setSelectedCondition(null);
        setForm(initialForm);

    };

    // Create / Update
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.condition_name.trim() || !form.condition_code.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Required fields",
                text: "Please fill in condition name and condition code.",
            });

            return;
        }

        if (!/^#[0-9A-Fa-f]{6}$/.test(form.color_code)) {

            Swal.fire({
                icon: "warning",
                title: "Invalid HEX color",
                text: "Please select a valid HEX color.",
            });

            return;
        }

        try {

            setIsSaving(true);

            if (selectedCondition) {

                await api.put(
                    route("updateCondition", {
                        id: selectedCondition.id
                    }),
                    form
                );

                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Condition updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            } else {

                await api.post(
                    route("createCondition"),
                    form
                );

                Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "New condition created successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

            }

            setShowModal(false);
            setSelectedCondition(null);
            setForm(initialForm);

            await fetchConditions();

        } catch (error) {

            console.error(
                "Save condition error:",
                error.response?.data || error.message
            );

            const errors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Failed to save",
                text: errors
                    ? Object.values(errors).flat().join("\n")
                    : error.response?.data?.message ||
                    "Unable to save condition.",
            });

        } finally {

            setIsSaving(false);

        }

    };

    // Delete condition
    const handleDelete = async (condition) => {

        const result = await Swal.fire({
            title: "Delete Condition?",
            text: `Are you sure you want to delete "${condition.condition_name}"?`,
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
                route("deleteCondition", {
                    id: condition.id
                })
            );

            setConditions(prev =>
                prev.filter(item => item.id !== condition.id)
            );

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Condition deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            console.error(
                "Delete condition error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: "error",
                title: "Delete failed",
                text: error.response?.data?.message ||
                    "Unable to delete condition.",
            });

        }

    };

    return (

        <MainLayout>

            <div className="w-full min-h-screen rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">

                <PageTitle title="Tooth Conditions" />

                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5 mb-5">

                    <div className="relative w-full sm:w-80">

                        <input
                            type="text"
                            placeholder="Search condition..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <svg
                            className="absolute left-3 top-3 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m21 21-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>

                    </div>

                    <button
                        type="button"
                        onClick={handleCreate}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                    >
                        <span className="text-lg">+</span>
                        Add Condition
                    </button>

                </div>

                <div className="flex justify-between items-center mb-3">

                    <p className="text-sm text-gray-500">
                        Total Conditions:{" "}
                        <span className="font-semibold text-gray-800">
                            {conditions.length}
                        </span>
                    </p>

                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

                        <tr>
                            <th className="px-5 py-4 w-16">No.</th>
                            <th className="px-5 py-4">Color</th>
                            <th className="px-5 py-4">Condition Name</th>
                            <th className="px-5 py-4">Condition Code</th>
                            <th className="px-5 py-4">HEX Code</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                        {isLoading ? (
                            <LoadingCondition />
                        ) : filteredConditions.length === 0 ? (
                            <NoConditionsFound />
                        ) : (
                            filteredConditions.map((condition, index) => (
                                <ContentCondition
                                    key={index}
                                    condition={condition}
                                    index={index}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            ))
                        )}

                        </tbody>

                    </table>

                </div>

                {showModal && (
                    <ToothConditionModal
                        selectedCondition={selectedCondition}
                        colorPresets={colorPresets}
                        handleCustomColor={handleCustomColor}
                        setForm={setForm}
                        handleSelectColor={handleSelectColor}
                        closeModal={closeModal}
                        handleSubmit={handleSubmit}
                        form={form}
                        handleChange={handleChange}
                        isSaving={isSaving}
                    />
                )}

            </div>

        </MainLayout>

    );

};

export default ToothConditions;
