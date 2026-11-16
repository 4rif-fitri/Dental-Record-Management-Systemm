import React from "react";
import "./InteractivePolygon.css";

const FiveSurfacee = ({ onSelect, currentTooth, skala, surfaceCondition }) => {

    const SpanOptions = ({ surface_id }) => {
        return (
            <select onChange={(e) => onSelect(surface_id, e.target.value)}
                className="select"
            >
                <option disabled selected>Pick a color</option>
                <option>Crimson</option>
                <option>Amber</option>
                <option>Velvet</option>
            </select>
        );
    };

    const selected = currentTooth?.selected_surfaces || [];

    const areas = [
        { name: "Buccal", points: "0,0 400,0 195,150 105,150" },
        { name: "Mesial", points: "0,0 150,170 0,300" },
        { name: "Distal", points: "300,0 300,300 170,150" },
        { name: "Lingual", points: "0,300 300,300 195,180 105,180" },
    ];

    return (
        <div className={"w-full h-full grid grid-cols-3 grid-cols-3 items-center"}>
            <span></span>
            <SpanOptions surface_id={7} />
            <span></span>

            <SpanOptions surface_id={5} />
            <span className={"flex items-center justify-center "}>
                <div className={`container  scale-${skala}`}>

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map(area => {
                    const isSelected = selected.some(
                        item => item.surface === area.name
                    );

                    return (
                        <polygon
                            key={area.name}
                            className={`area ${isSelected ? "active" : ""}`}
                            points={area.points}
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
                    selected.some(item => item.surface === "Occlusal")
                        ? "active"
                        : ""
                }`}
            />
        </div>
            </span>
            <SpanOptions surface_id={6} />

            <span></span>
            <SpanOptions surface_id={1} />
            <SpanOptions surface_id={4} />
        </div>
    );
};

export default FiveSurfacee;
