
import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Tooth({
    toothNumber, model, onSelect,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    conditionColor = null,
}) {

    const { scene } = useGLTF(model);
    const [selected, setSelected] = useState(false);

    console.log(scene)

    const defaultColor = "";

    useEffect(() => {

        scene.traverse((child) => {

            if (!child.isMesh) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            materials.forEach((material) => {

                console.log("Material:", material.name);

                if (material.name === "L") {
                    material.color.set("#000000");
                }

            });

        });

    }, [scene]);

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
