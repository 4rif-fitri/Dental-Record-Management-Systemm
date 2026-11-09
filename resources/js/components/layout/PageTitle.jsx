import React from "react";

const pageTitle = ({title}) => {
    return (
        <div className="mb-4 flex gap-2 border-gray-300 justify-between">
            <h1 className="font-bold tracking-tight text-gray-900 sm:text-3xl">
                {title}
            </h1>
        </div>
    )
}
export default pageTitle
