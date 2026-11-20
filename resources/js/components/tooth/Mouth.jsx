
import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect } from "react";

export default function Mouth({
    model, hasSelection = false,
    position = [0, 0, 0], rotation = [0, 0, 0],
    scale = [1, 1, 1]
}) {

    const { scene } = useGLTF(model);

    const clonedScene = useMemo(() => {

        const cloned = scene.clone(true);

        cloned.traverse((child) => {

            if (!child.isMesh) return;

            if (Array.isArray(child.material)) {
                child.material = child.material.map(material =>
                    material.clone()
                );
            } else {
                child.material = child.material.clone();
            }

        });

        return cloned;

    }, [scene]);

    useEffect(() => {

        clonedScene.traverse((child) => {

            if (!child.isMesh) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            materials.forEach(material => {

                material.transparent = true;

                // material.opacity = hasSelection ? 0.3 : 1;

                // material.depthWrite = !hasSelection;

                material.needsUpdate = true;

            });

        });

    }, [clonedScene, hasSelection]);

    return (
        <primitive
            object={clonedScene}
            position={position}
            rotation={rotation}
            scale={scale}
        />
    );

}
