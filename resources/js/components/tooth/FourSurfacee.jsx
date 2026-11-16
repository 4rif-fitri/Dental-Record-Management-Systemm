import React from "react";
import "./InteractivePolygon.css";

const FourSurfacee = ({ onSelect, currentTooth , skala, surfaceCondition}) => {

    const SpanOptions = ({ surface_id }) => {
        return (
            <select
                onChange={(e) => onSelect(surface_id, e.target.value)}
                className="select"
                defaultValue=""
            >
                <option value="" disabled>
                    Pick a color
                </option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>
        );
    };

    const selected = currentTooth?.selected_surfaces || [];

    const areas = [
        { name: "Incisal", points: "0,0 300,0 195,150 105,150" },
        { name: "Mesial", points: "0,0 105,150 0,300" },
        { name: "Distal", points: "300,0 300,300 195,150" },
        { name: "Lingual", points: "0,300 300,300 195,150 105,150" },
    ];

    const handleSelect = (name) => {
        onSelect?.(name);
    };

    return (
        <div className={"w-full h-full grid grid-cols-3 grid-cols-3 items-center"}>
            <span></span>
            <SpanOptions surface_id={2} />
            <span></span>

            <SpanOptions surface_id={5} />
            <span className={"flex items-center justify-center "}>
                <div className={`container scale-${skala}`}>

                <svg className="shapes" viewBox="0 0 300 300">

                    {areas.map((area) => (
                        <polygon
                            key={area.name}
                            className={`area ${
                                selected.includes(area.name) ? "active" : ""
                            }`}
                            points={area.points}
                            // onClick={() => handleSelect(area.name)}
                        />
                    ))}

                </svg>

                <div className="content top-content"></div>
                <div className="content left-content"></div>
                <div className="content right-content"></div>
                <div className="content bottom-content"></div>

            </div>
            </span>
            <SpanOptions surface_id={6} />

            <span></span>
            <SpanOptions surface_id={3} />
            <span></span>
        </div>
    );
};

export default FourSurfacee;
