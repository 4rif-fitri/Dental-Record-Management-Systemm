
import React, { useState, useEffect } from "react";
import "./InteractivePolygon.css";

const FiveSurfacee = ({ onSelect, currentTooth }) => {

    const [selected, setSelected] = useState(
        currentTooth?.surfaces || []
    );

    useEffect(() => {
        setSelected(currentTooth?.surfaces || []);
    }, [currentTooth]);

    const areas = [
        { name: "TOP", points: "0,0 400,0 195,150 105,150" },
        { name: "LEFT", points: "0,0 150,170 0,300" },
        { name: "RIGHT", points: "300,0 300,300 170,150" },
        { name: "BOTTOM", points: "0,300 300,300 195,180 105,180" },
    ];

    const handleSelect = (name) => {

        const updated = selected.includes(name)
            ? selected.filter((item) => item !== name)
            : [...selected, name];

        setSelected(updated);

        onSelect?.({
            tooth: currentTooth?.tooth_number,
            surfaces: updated,
        });
    };

    return (
        <div className="container scale-50 md:scale-[0.85] lg:scale-[0.70]">

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

            <div
                className={`center ${
                    selected.includes("CENTER") ? "active" : ""
                }`}
                onClick={() => handleSelect("CENTER")}
            ></div>

        </div>
    );
};

export default FiveSurfacee;
