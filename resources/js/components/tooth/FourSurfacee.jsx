import React from "react";
import "./InteractivePolygon.css";

const FourSurfacee = ({ onSelect, currentTooth , skala, surfaceCondition, selectedSurface}) => {

    const areas = [
        { id: 2, name: "Incisal", points: "0,0 300,0 195,150 105,150" },
        { id: 5, name: "Mesial", points: "0,0 105,150 0,300" },
        { id: 6, name: "Distal", points: "300,0 300,300 195,150" },
        { id: 3, name: "Lingual", points: "0,300 300,300 195,150 105,150" },
    ];

    return (
        <div className={"w-full h-full grid grid-cols-3 grid-cols-3 items-center"}>
            <span></span>
            <select className="select" onChange={(e) => onSelect(2, e.target.value)}>
                <option value="">Pick a color</option>
                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>
            <span></span>

            <select className="select" onChange={(e) => onSelect(5, e.target.value)}>
                <option value="">Pick a color</option>
                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>
            <span className={"flex items-center justify-center "}>
                <div className={`container scale-${skala}`}>

                <svg className="shapes" viewBox="0 0 300 300">

                    {areas.map((area) => (
                        <polygon
                            key={area.id}
                            className={`area ${
                                selectedSurface.some(
                                    item => Number(item.surface_id) === area.id
                                )
                                    ? "active"
                                    : ""
                            }`}
                            points={area.points}
                        />
                    ))}

                </svg>

                <div className="content top-content"></div>
                <div className="content left-content"></div>
                <div className="content right-content"></div>
                <div className="content bottom-content"></div>

            </div>
            </span>
            <select className="select" onChange={(e) => onSelect(6, e.target.value)}>
                <option value="">Pick a color</option>
                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

            <span></span>
            <select className="select" onChange={(e) => onSelect(3, e.target.value)}>
                <option value="">Pick a color</option>
                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>
            <span></span>

        </div>
    );
};

export default FourSurfacee;
