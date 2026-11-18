import React from "react";

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <h2 className="mt-5 text-lg font-semibold text-gray-800">
                Loading Examination
            </h2>
            <p className="mt-2 text-sm text-gray-500">
                Please wait while we prepare patient information...
            </p>
        </div>
    )
}
export default LoadingPage
