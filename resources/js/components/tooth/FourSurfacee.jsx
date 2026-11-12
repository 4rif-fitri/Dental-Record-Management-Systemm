import React, { useState, useEffect } from "react";
import "./InteractivePolygon.css";

const FourSurfacee = ({ onSelect, currentTooth , skala}) => {

    const selected = currentTooth?.selected_surfaces || [];

    const areas = [
        {
            name: "TOP",
            points: "0,0 300,0 195,150 105,150",
        },
        {
            name: "LEFT",
            points: "0,0 105,150 0,300",
        },
        {
            name: "RIGHT",
            points: "300,0 195,150 300,300",
        },
        {
            name: "BOTTOM",
            points: "0,300 300,300 198,150 105,150",
        },
    ];

    const handleSelect = (name) => {
        onSelect?.(name);
    };

    return (
        <div className={`container scale-${skala}`}>

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map((area) => (
                    <polygon
                        key={area.name}
                        className={`area ${
                            selected.includes(area.name) ? "active" : ""
                        }`}
                        points={area.points}
                        onClick={() => handleSelect(area.name)}
                    />
                ))}

            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

        </div>
    );
};

export default FourSurfacee;
