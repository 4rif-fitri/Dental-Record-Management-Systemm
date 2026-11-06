import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Tooth({
    toothNumber,
    model,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    onSelect,
}) {
    const { scene } = useGLTF(model);

    const [selected, setSelected] = useState(false);

    const handleClick = (event) => {
        event.stopPropagation();

        if (toothNumber == "maxilla" || toothNumber == "mandible") return; // Ignore clicks on maxilla and mandible

        console.log("Tooth Number:", toothNumber);
        console.log("Clicked Object:", event.object);
        console.log("Object Name:", event.object.name);
        console.log("Object Type:", event.object.type);
        console.log("Geometry:", event.object.geometry);
        console.log("Clicked Position:", event.point);

        const newSelected = !selected;
        setSelected(newSelected);

        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(newSelected ? "#ff0000" : "#f5f5dc");
            }
        });

        if (onSelect) {
            onSelect(toothNumber);
        }
    };

    return (
        <primitive
            object={scene}
            position={position}
            rotation={rotation}
            scale={scale}
            onClick={handleClick}
        />
    );
}
