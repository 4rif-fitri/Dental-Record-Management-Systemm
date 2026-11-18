import React from "react";
import PageTitle from "@/components/atom/PageTitle.jsx";

const ToothConditionModal = ({
    selectedCondition, colorPresets, handleCustomColor,
    setForm, handleSelectColor, closeModal,
    handleSubmit, form, handleChange,
    isSaving
                             }) => {

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">

                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">

                    <PageTitle title={selectedCondition ? "Update Condition" : "Create Condition"} />

                    <button type="button" onClick={closeModal}
                            className="text-gray-400 hover:text-gray-700 text-2xl">
                        &times;
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="p-6 space-y-4">

                        {/* Condition Name */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Condition Name
                            </label>

                            <input
                                type="text"
                                name="condition_name"
                                value={form.condition_name}
                                onChange={handleChange}
                                placeholder="e.g. Dental Caries"
                                maxLength={100}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Condition Code
                            </label>

                            <input
                                type="text"
                                name="condition_code"
                                value={form.condition_code}
                                onChange={handleChange}
                                placeholder="e.g. CAR"
                                maxLength={100}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Color
                            </label>

                            <div className="grid grid-cols-6 gap-3">

                                {colorPresets.map((preset) => (

                                    <button
                                        key={preset.color}
                                        type="button"
                                        title={`${preset.name} - ${preset.hex}`}
                                        onClick={() => handleSelectColor(preset)}
                                        className={`w-full aspect-square rounded-lg border-2 transition hover:scale-105 ${preset.color} ${
                                            form.color === preset.color
                                                ? "border-gray-900 ring-2 ring-gray-300 ring-offset-2"
                                                : "border-transparent"
                                        }`}
                                    />

                                ))}

                            </div>

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Custom Color / HEX Code
                            </label>

                            <div className="flex gap-3">

                                <input
                                    type="color"
                                    value={form.color_code}
                                    onChange={handleCustomColor}
                                    className="w-14 h-11 border border-gray-300 rounded-lg p-1 cursor-pointer"
                                />

                                <input
                                    type="text"
                                    value={form.color_code}
                                    onChange={(e) => {
                                        setForm(prev => ({
                                            ...prev,
                                            color: "custom",
                                            color_code: e.target.value
                                        }));
                                    }}
                                    placeholder="#EF4444"
                                    maxLength={7}
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono uppercase outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">

                            <p className="text-xs text-gray-500 mb-3">
                                Color Preview
                            </p>

                            <div className="flex items-center gap-3">

                                <div
                                    className="w-12 h-12 rounded-lg border border-gray-200"
                                    style={{
                                        backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(form.color_code)
                                            ? form.color_code
                                            : "#FFFFFF"
                                    }}
                                />

                                <div>

                                    <p className="font-semibold text-gray-800 text-sm">
                                        {form.condition_name || "Condition Name"}
                                    </p>

                                    <p className="text-xs text-gray-500 font-mono">
                                        {form.color_code}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex justify-end gap-3 px-6 py-4 ">

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn btn-primary"
                        >
                            {isSaving
                                ? "Saving..."
                                : selectedCondition
                                    ? "Update Condition"
                                    : "Create Condition"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}
export default ToothConditionModal
