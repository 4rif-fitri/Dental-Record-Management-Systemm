
import { useGLTF } from "@react-three/drei";
import { useState, useEffect, useMemo } from "react";

export default function Tooth({
                                  toothNumber,
                                  model,
                                  onSelect,
                                  isSelected = false,
                                  hasSelection = false,
                                  position = [0, 0, 0],
                                  rotation = [0, 0, 0],
                                  scale = [1, 1, 1],
                                  selectedSurfaces = [],
                                  finding = null,
                                  findings = [],
                                  onHover,
                              }) {

    const { scene } = useGLTF(model);

    // Clone scene and materials
    const clonedScene = useMemo(() => {

        const cloned = scene.clone(true);

        cloned.traverse((child) => {

            if (!child.isMesh) return;

            if (Array.isArray(child.material)) {

                child.material = child.material.map(material => {

                    const clonedMaterial = material.clone();

                    clonedMaterial.userData.originalColor =
                        material.color.clone();

                    return clonedMaterial;

                });

            } else {

                const clonedMaterial = child.material.clone();

                clonedMaterial.userData.originalColor =
                    child.material.color.clone();

                child.material = clonedMaterial;

            }

        });

        return cloned;

    }, [scene]);

    // =====================================
    // Apply surface color and opacity
    // =====================================

    useEffect(() => {

        clonedScene.traverse((child) => {

            if (!child.isMesh) return;

            const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

            materials.forEach((material) => {

                // Buccal.001 -> Buccal
                const surfaceName = material.name
                    .split(".")[0]
                    .trim();

                // Find matching surface
                const surfaceData = selectedSurfaces.find(
                    item =>
                        item.surface_name?.toLowerCase() ===
                        surfaceName.toLowerCase()
                );

                // Apply condition color
                const color = surfaceData?.condition?.color_code;

                if (color) {

                    material.color.set(color);

                } else {

                    material.color.copy(
                        material.userData.originalColor
                    );

                }

                // Opacity
                material.transparent = true;

                material.opacity = !hasSelection
                    ? 1
                    : isSelected
                        ? 1
                        : 0.3;

                material.depthWrite = material.opacity === 1;

                material.needsUpdate = true;

            });

        });

    }, [clonedScene, selectedSurfaces, isSelected, hasSelection]);

    // =====================================
    // Handle click
    // =====================================

    const getToothInfo = () => ({
        toothNumber,
        finding,
        surfaces: selectedSurfaces
    });

    const handlePointerOver = (event) => {
        event.stopPropagation();

        onHover?.(getToothInfo());
    };

    const handlePointerOut = (event) => {
        event.stopPropagation();

        onHover?.(null);
    };

    const handleClick = (event) => {
        event.stopPropagation();

        onSelect?.(
            toothNumber,
            event.point,
            getToothInfo()
        );
    };
    return (
        <primitive
            object={clonedScene}
            position={position}
            rotation={rotation}
            scale={scale}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        />
    );

}
