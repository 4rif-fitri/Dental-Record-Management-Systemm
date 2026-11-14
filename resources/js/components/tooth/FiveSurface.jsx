import React from 'react';
import "./InteractivePolygon.css";

const FiveSurface = ({
                         onSelect,
                         toothNumber,
                         currentTooth = null,
                         selectedSurfaces = []
                     }) => {

    const areas = [
        { name: "Buccal", points: "0,0 300,0 195,150 105,150" },
        { name: "Mesial", points: "0,0 150,170 0,300" },
        { name: "Distal", points: "300,0 300,300 170,150" },
        { name: "Lingual", points: "0,300 300,300 195,180 105,180" },
    ];

    const conditionColor =
        currentTooth?.condition?.color_code || "#ffffff";

    const latestSurfaces = currentTooth?.surfaces?.map(
        item => item.surface?.surface_name
    ) || [];

    return (
        <div className="container scale-50 md:scale-[0.85] lg:scale-[0.70]">

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map((area) => {

                    const isSelected = latestSurfaces.includes(area.name);

                    return (
                        <polygon
                            key={area.name}
                            className="area"
                            points={area.points}
                            style={{
                                fill: isSelected ? conditionColor : "white"
                            }}
                            onClick={() => onSelect?.(area.name)}
                        />
                    );
                })}

            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

            <div
                className="center"
                style={{
                    backgroundColor: latestSurfaces.includes("Occlusal")
                        ? conditionColor
                        : "white"
                }}
                onClick={() => onSelect?.("Occlusal")}
            />

        </div>
    );
};

export default FiveSurface;
