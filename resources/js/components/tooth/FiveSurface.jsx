import React from "react";
import "./InteractivePolygon.css";

const FiveSurface = ({onSelect, toothNumber, jaw, selectedSurfaces = []}) => {

    let areas
    let jaww = [1, 2, 5, 6].includes(
        Math.floor(Number(toothNumber) / 10)
    ) ? "upper" : "lower";

    if(jaww === "upper"){
        areas = [
            { id: 7, name: "Buccal", points: "0,0 400,0 195,150 105,150" },
            { id: 5, name: "Mesial", points: "0,0 150,170 0,300" },
            { id: 6, name: "Distal", points: "300,0 300,300 170,150" },
            { id: 1, name: "Palatal", points: "0,300 300,300 195,180 105,180" },
        ];
    }else if(jaww === "lower"){
        areas = [
            { id: 7, name: "Buccal", points: "0,0 400,0 195,150 105,150" },
            { id: 5, name: "Mesial", points: "0,0 150,170 0,300" },
            { id: 6, name: "Distal", points: "300,0 300,300 170,150" },
            { id: 3, name: "Lingual", points: "0,300 300,300 195,180 105,180" },
        ];
    }

    // Get condition color for each surface
    const getSurfaceColor = (surfaceId) => {

        const selected = selectedSurfaces.find(
            item => Number(item.surface_id) === Number(surfaceId)
        );

        return selected?.condition?.color_code ?? "#ffffff";
    };

    const isSelected = (surfaceId) => {
        return selectedSurfaces.some(
            item => Number(item.surface_id) === Number(surfaceId)
        );
    };

    return (
        <div className="container scale-50 md:scale-[0.85] lg:scale-[0.70]">

            <svg className="shapes" viewBox="0 0 300 300">

                {areas.map(area => (

                    <polygon
                        key={area.id}
                        points={area.points}
                        fill={getSurfaceColor(area.id)}
                        stroke="black"
                        onClick={() => onSelect?.(area.name)}
                        style={{ cursor: "pointer" }}
                    />

                ))}

            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

            {/* Occlusal - ID 4 */}
            <div
                className="center"
                style={{
                    backgroundColor: getSurfaceColor(4),
                    cursor: "pointer"
                }}
                onClick={() => onSelect?.("Occlusal")}
            />

        </div>
    );
};

export default FiveSurface;
