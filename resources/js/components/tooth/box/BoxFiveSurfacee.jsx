import React from "react";
import "../InteractivePolygon.css";

const BoxFiveSurface = ({ currentTooth = {}, skala }) => {

    const conditionColor = currentTooth.condition?.color_code || "#93c5fd";

    const selected = currentTooth.surfaces || [];

    const selectedSurfaceNames = selected.map(
        (item) => item.surface?.surface_name
    );

    const areas = [
        { name: "Buccal", points: "0,0 400,0 195,150 105,150" },
        { name: "Mesial", points: "0,0 150,170 0,300" },
        { name: "Distal", points: "300,0 300,300 170,150" },
        { name: "Lingual", points: "0,300 300,300 195,180 105,180" },
    ];

    return (
        <div className={`container scale-${skala}`}>

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map((area) => {

                    const isSelected = selectedSurfaceNames.includes(area.name);

                    return (
                        <polygon
                            key={area.name}
                            className={`area ${isSelected ? "active" : ""}`}
                            points={area.points}
                            style={{
                                "--condition-color": conditionColor
                            }}
                        />
                    );
                })}

            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

            <div
                className={`center ${
                    selectedSurfaceNames.includes("Occlusal") ? "active" : ""
                }`}
                style={{
                    "--condition-color": conditionColor
                }}
            />

        </div>
    );
};

export default BoxFiveSurface;
