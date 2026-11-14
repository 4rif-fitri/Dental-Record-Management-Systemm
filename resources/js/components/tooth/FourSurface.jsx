import React from 'react';
import "./InteractivePolygon.css";

const FourSurface = ({onSelect, currentTooth = null}) => {

    const areas = [
        { name: "Incisal", points: "0,0 300,0 195,150 105,150" },
        { name: "Mesial", points: "0,0 105,150 0,300" },
        { name: "Distal", points: "300,0 300,300 195,150" },
        { name: "Lingual", points: "0,300 300,300 195,150 105,150" },
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
                            className={"area"}
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

        </div>
    );
};

export default FourSurface;
