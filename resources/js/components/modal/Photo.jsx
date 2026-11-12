import React, { useState, useRef } from 'react';

const Photo = ({ showAddPhoto }) => {

    const [photo, setPhoto] = useState(null);
    const [notes, setNotes] = useState("");

    const fileInputRef = useRef(null);

    // Select Photo
    const handleFile = (file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        setPhoto({
            file,
            preview: URL.createObjectURL(file)
        });
    };

    // Drag & Drop
    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    // Save Photo
    const handleSubmit = (e) => {
        e.preventDefault();

        const photoData = {
            photo: photo?.file || null,
            notes: notes
        };

        console.log(photoData);

        setAddPhoto(false);
    };

    return (
        showAddPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black">

                <div className="w-[95vw] sm:w-[80vw] lg:w-[40vw] rounded-xl bg-white p-6 sm:p-10 shadow-xl">
                	<div className="mb-4 flex flex-wrap justify-between items-center">
                    <h2 className="font-bold text-3xl">Add Photo</h2>
                    <button onClick={() => setAddPhoto(false)}
                        className="btn w-24">
                        Close
                    </button>
                	</div>

                    <form onSubmit={handleSubmit}>

                        {/* Photo Upload */}
                        <div
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="w-full h-[250px] sm:h-[350px] border-2 border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition"
                        >

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                hidden
                                onChange={(e) => handleFile(e.target.files[0])}
                            />

                            {photo ? (
                                <div className="relative w-full h-full">

                                    <img
                                        src={photo.preview}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            URL.revokeObjectURL(photo.preview);
                                            setPhoto(null);
                                        }}
                                        className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ) : (
                                <span className="text-xl sm:text-3xl font-medium">
                                    Choose / Drop Photo Here
                                </span>
                            )}

                        </div>

                        {/* Notes */}
                        <div className="mt-7 mb-7">

                            <label className="block text-2xl font-medium mb-2">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full h-[180px] border-2 border-gray-300 p-4 outline-none focus:border-blue-500 resize-none"
                            />

                        </div>

                        {/* Save */}
                        <button
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white text-xl py-3 rounded-lg"
                        >
                            Save
                        </button>

                    </form>

                </div>
            </div>
        )
    );
};

export default Photo;
