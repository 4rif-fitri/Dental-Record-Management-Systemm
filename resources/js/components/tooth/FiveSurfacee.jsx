
import React from "react";
import "./InteractivePolygon.css";

const FiveSurfacee = ({
                          onSelect,
                          currentTooth,
                          skala,
                          surfaceCondition,
                          selectedSurface = []
                      }) => {

    const areas = [
        { id: 7, name: "Buccal", points: "0,0 400,0 195,150 105,150" },
        { id: 5, name: "Mesial", points: "0,0 150,170 0,300" },
        { id: 6, name: "Distal", points: "300,0 300,300 170,150" },
        { id: 3, name: "Lingual", points: "0,300 300,300 195,180 105,180" },
    ];

    return (

        <div className="w-full h-full grid grid-cols-3 items-center">

            <span></span>

            {/* Buccal - ID 7 */}
            <select
                className="select"
                value={
                    selectedSurface.find(
                        item => Number(item.surface_id) === 7
                    )?.surface_condition_id ?? ""
                }
                onChange={(e) => onSelect(7, e.target.value)}
            >
                <option value="">Pick a color</option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

            <span></span>

            {/* Mesial - ID 5 */}
            <select
                className="select"
                value={
                    selectedSurface.find(
                        item => Number(item.surface_id) === 5
                    )?.surface_condition_id ?? ""
                }
                onChange={(e) => onSelect(5, e.target.value)}
            >
                <option value="">Pick a color</option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

            {/* Tooth diagram */}
            <span className="flex items-center justify-center">

                <div className={`container scale-${skala}`}>

                    <svg className="shapes" viewBox="0 0 300 300">

                        {areas.map((area) => (
                            <polygon
                                key={area.id}
                                className={`area ${
                                    selectedSurface.some(
                                        item =>
                                            Number(item.surface_id) === area.id
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

                    {/* Occlusal - ID 4 */}
                    <div
                        className={`center ${
                            selectedSurface.some(
                                item => Number(item.surface_id) === 4
                            )
                                ? "active"
                                : ""
                        }`}
                    />

                </div>

            </span>

            {/* Distal - ID 6 */}
            <select
                className="select"
                value={
                    selectedSurface.find(
                        item => Number(item.surface_id) === 6
                    )?.surface_condition_id ?? ""
                }
                onChange={(e) => onSelect(6, e.target.value)}
            >
                <option value="">Pick a color</option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

            <span></span>

            {/* Lingual - ID 3 */}
            <select
                className="select"
                value={
                    selectedSurface.find(
                        item => Number(item.surface_id) === 3
                    )?.surface_condition_id ?? ""
                }
                onChange={(e) => onSelect(3, e.target.value)}
            >
                <option value="">Pick a color</option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

            {/* Center / Occlusal - ID 4 */}
            <select
                className="select"
                value={
                    selectedSurface.find(
                        item => Number(item.surface_id) === 4
                    )?.surface_condition_id ?? ""
                }
                onChange={(e) => onSelect(4, e.target.value)}
            >
                <option value="">Pick a color</option>

                {surfaceCondition.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.condition_name}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default FiveSurfacee;
