import React from 'react';

const PreviewPhoto = ({showPreviewPhoto}) => {

    if (!showPreviewPhoto) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 text-black">

            <div className="w-[95vw] sm:w-[80vw] lg:w-[40vw] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 sm:p-10 shadow-xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">

                    <h2 className="font-bold text-3xl">
                        Preview Photo
                    </h2>

                    <button
                        onClick={() => setShowPreviewPhoto(false)}
                        className="btn"
                    >
                        Close
                    </button>

                </div>

                {/* Image */}
                <div className="w-full h-[350px] border-2 border-gray-300 flex justify-center items-center overflow-hidden">

                        <img
                            src={photo.preview || photo}
                            alt="Dental Record"
                            className="w-full h-full object-contain"
                        />
                        <p className="text-gray-400">
                            No Photo Available
                        </p>

                </div>

                {/* Notes */}
                <div className="mt-6">

                    <h3 className="text-xl font-semibold mb-2">
                        Notes
                    </h3>


                </div>

            </div>

        </div>
    );
};

export default PreviewPhoto;
