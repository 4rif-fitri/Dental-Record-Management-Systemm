
import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Tooth({
    toothNumber, model, onSelect,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    finding = null,
    conditionColor = null,
}) {

    const { scene } = useGLTF(model);
    const [selected, setSelected] = useState(false);

    const defaultColor = "#ffffff";

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(conditionColor || defaultColor);
            }
        });
    }, [scene, conditionColor]);

    const handleClick = (event) => {
        event.stopPropagation();

        if (toothNumber === "maxilla" || toothNumber === "mandible") return;

        const newSelected = !selected;

        setSelected(newSelected);

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
