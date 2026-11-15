const TreatmentModal = ({
    selectedProcedure, closeModal, handleChange,
    procedureTypes, isSaving, handleSubmit, form
}) => {

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">

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
    )
}

export default TreatmentModal
