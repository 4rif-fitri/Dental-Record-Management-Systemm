import React from 'react';
import "./InteractivePolygon.css";

const FiveSurface = ({
                         onSelect,
                         toothNumber,
                         selectedSurfaces = []
                     }) => {

    const areas = [
        { name: "TOP", points: "0,0 300,0 195,150 105,150" },
        { name: "LEFT", points: "0,0 150,170 0,300" },
        { name: "RIGHT", points: "300,0 300,300 170,150" },
        { name: "BOTTOM", points: "0,300 300,300 195,180 105,180" },
    ];

    return (
        <div className="container scale-50 md:scale-[0.85] lg:scale-[0.70]">

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map((area) => (
                    <polygon
                        key={area.name}
                        className={`area ${
                            selectedSurfaces.includes(area.name)
                                ? "active"
                                : ""
                        }`}
                        points={area.points}
                        onClick={() => onSelect(area.name)}
                    />
                ))}

            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

            <div
                className={`center ${
                    selectedSurfaces.includes("CENTER")
                        ? "active"
                        : ""
                }`}
                onClick={() => onSelect("CENTER")}
            ></div>

        </div>
    );
};

export default FiveSurface;
