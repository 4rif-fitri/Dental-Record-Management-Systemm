
import React, { useState } from 'react';
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Tooth from '../tooth/Tooth';
import Mouth from '../tooth/Mouth';
import { useRef, useEffect } from "react";
import * as THREE from "three";

const toothModels = import.meta.glob("../../assets/*.glb", {
    eager: true,
    query: "?url",
    import: "default",
});

const getToothName = (number) => {

    const digit = Number(String(number).slice(-1));
    const quadrant = Number(String(number)[0]);

    const permanentNames = {
        1: "Central Incisor",
        2: "Lateral Incisor",
        3: "Canine",
        4: "First Premolar",
        5: "Second Premolar",
        6: "First Molar",
        7: "Second Molar",
        8: "Third Molar"
    };

    const primaryNames = {
        1: "Central Incisor",
        2: "Lateral Incisor",
        3: "Canine",
        4: "First Molar",
        5: "Second Molar"
    };

    const positions = {
        1: "Upper Right",
        2: "Upper Left",
        3: "Lower Left",
        4: "Lower Right",
        5: "Upper Right",
        6: "Upper Left",
        7: "Lower Left",
        8: "Lower Right"
    };

    const isPrimary = quadrant >= 5;

    const name = isPrimary
        ? primaryNames[digit]
        : permanentNames[digit];

    return `${positions[quadrant]} ${name || "Tooth"}`;
};

const CameraFocus = ({ controlsRef, focusPoint }) => {

    const { camera } = useThree();

    useEffect(() => {

        const controls = controlsRef.current;

        if (!controls) return;

        // Reset camera apabila tiada selection
        if (!focusPoint) {

            camera.position.set(0, 0.25, 0.75);

            controls.target.set(0, 0, 0);

            controls.update();

            return;
        }

        // Get clicked tooth position
        const target = new THREE.Vector3(
            focusPoint.x,
            focusPoint.y,
            focusPoint.z
        );

        // Maintain current viewing direction
        const direction = camera.position
            .clone()
            .sub(controls.target)
            .normalize();

        // Zoom distance
        const zoomDistance = 0.35;

        // Move camera to clicked tooth
        camera.position.copy(
            target.clone().add(
                direction.multiplyScalar(zoomDistance)
            )
        );

        // Center clicked tooth
        controls.target.copy(target);

        controls.update();

    }, [focusPoint, camera, controlsRef]);

    return null;
};

// Permanent teeth
const permanentTeeth = [
    18, 17, 16, 15, 14, 13, 12, 11,
    21, 22, 23, 24, 25, 26, 27, 28,
    48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38
].map(number => ({
    number,
    model: toothModels[`../../assets/${number}.glb`]
}));

// Primary teeth
const primaryTeeth = [
    55, 54, 53, 52, 51,
    61, 62, 63, 64, 65,
    85, 84, 83, 82, 81,
    71, 72, 73, 74, 75
].map(number => ({
    number,
    model: toothModels[`../../assets/${number}.glb`]
}));

const DentalChart3D = ({ toothFinding = [] }) => {

    const [selectedJaw, setSelectedJaw] = useState("all");
    const [selectedDentition, setSelectedDentition] = useState("permanent");

    const [selectedTooth, setSelectedTooth] = useState(null);

    const [focusPoint, setFocusPoint] = useState(null);
    const controlsRef = useRef();
    const [hoveredTooth, setHoveredTooth] = useState(null);
    const [clickedToothInfo, setClickedToothInfo] = useState(null);
    const displayedTooth = hoveredTooth || clickedToothInfo;

    const renderTooth = (tooth) => {

        const findings = toothFinding?.filter(
            item =>
                Number(item.tooth?.tooth_number) === Number(tooth.number)
        ) || [];

        // Latest finding first
        const sortedFindings = [...findings].sort(
            (a, b) => {

                const dateCompare =
                    new Date(b.created_at) - new Date(a.created_at);

                return dateCompare || Number(b.id) - Number(a.id);

            }
        );

        const latestFinding = sortedFindings[0] || null;

        // Combine surfaces from all findings
        const surfaceMap = new Map();

        sortedFindings.forEach(finding => {

            finding.surfaces?.forEach(surface => {

                const surfaceId = Number(surface.surface_id);

                if (!surfaceMap.has(surfaceId)) {

                    surfaceMap.set(surfaceId, {
                        surface_id: surfaceId,
                        surface_name: surface.surface?.surface_name,
                        surface_condition_id: surface.surface_condition_id,
                        surface_condition: surface.surface_condition,
                        finding_id: finding.id,
                        condition: finding.condition
                    });

                }

            });

        });

        const selectedSurfaces = Array.from(surfaceMap.values());

        if (!tooth.model) {
            console.error(`Model ${tooth.number}.glb tidak dijumpai`);
            return null;
        }

        return (
            <Tooth
                key={tooth.number}
                toothNumber={tooth.number}
                model={tooth.model}

                position={[0, -0.175, 0]}
                rotation={[0, 0, 0]}

                selectedSurfaces={selectedSurfaces}
                finding={latestFinding}
                findings={findings}

                isSelected={selectedTooth === tooth.number}
                hasSelection={selectedTooth !== null}

                onHover={setHoveredTooth}

                onSelect={(number, point, info) => {

                    if (selectedTooth === number) {

                        setSelectedTooth(null);
                        setFocusPoint(null);
                        setClickedToothInfo(null);

                    } else {

                        setSelectedTooth(number);
                        setFocusPoint(point);
                        setClickedToothInfo(info);

                    }

                }}
            />
        );

    };

    const selectedTeeth =
        selectedDentition === "primary"
            ? primaryTeeth
            : selectedDentition === "permanent"
                ? permanentTeeth
                : [...permanentTeeth, ...primaryTeeth];

    const filteredTeeth = selectedTeeth.filter(tooth => {

        const firstDigit = String(tooth.number)[0];

        const isUpper = ["1", "2", "5", "6"].includes(firstDigit);
        const isLower = ["3", "4", "7", "8"].includes(firstDigit);

        return (
            selectedJaw === "all" ||
            (selectedJaw === "upper" && isUpper) ||
            (selectedJaw === "lower" && isLower)
        );

    });

    const showPrimary =
        selectedDentition === "primary" ||
        selectedDentition === "all";

    const showPermanent =
        selectedDentition === "permanent" ||
        selectedDentition === "all";


    return (
        <>
            <div className="h-160 gap-0 bg-[#0f172a] overflow-hidden relative">
                {displayedTooth && (
                    <div className="absolute top-3 left-3 z-20 w-72 rounded-xl border border-teal-600 bg-slate-900/95 p-3 shadow-xl pointer-events-none">
                        <div className="text-teal-400 font-bold text-sm">
                            FDI #{displayedTooth.toothNumber}
                        </div>

                        <div className="text-white font-semibold text-base mt-1">
                            {getToothName(displayedTooth.toothNumber)}
                        </div>

                        <div className="text-slate-400 text-xs mt-1">
                            {Number(String(displayedTooth.toothNumber)[0]) >= 5
                                ? "Primary"
                                : "Permanent"}
                        </div>

                        <div className="flex justify-between text-xs mt-2">
                            <span className="text-slate-300">
                                Condition
                            </span>
                            <span className="font-semibold"
                                style={{color: displayedTooth.finding?.condition?.color_code || "#94a3b8" }}>
                                {displayedTooth.finding?.condition?.condition_name || "No Record"}
                            </span>
                        </div>

                        <div className="text-white font-semibold text-sm mt-3">
                            Surface Conditions
                        </div>

                        <div className="border-t border-slate-700 mt-2 pt-2 space-y-2">
                            {displayedTooth.surfaces?.length > 0 ? (
                                displayedTooth.surfaces.map(surface => (
                                    <div key={surface.surface_id} className="flex justify-between text-xs">
                                        <span className="text-slate-300">
                                            {surface.surface_name}
                                        </span>
                                        <span className="font-semibold"
                                            style={{color: surface.condition?.color_code || "#94a3b8"}}>
                                            {surface.surface_condition?.condition_name || "Unknown"}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-slate-400 text-xs">
                                    No surface records found
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <Canvas key={selectedDentition} camera={{ position: [0, 0.25, 0.75] }}>

                    <ambientLight intensity={2} />

                    <OrbitControls
                        ref={controlsRef}
                        enableDamping
                        minDistance={0.2}
                        maxDistance={2}
                    />

                    <CameraFocus
                        controlsRef={controlsRef}
                        focusPoint={focusPoint}
                    />

                    {/* MAXILLA */}
                    {selectedJaw !== "lower" && (
                        <>

                            {showPermanent && (
                                <Mouth
                                    toothNumber="maxilla"
                                    model={toothModels["../../assets/ma.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    hasSelection={selectedTooth !== null}
                                />
                            )}

                            {showPrimary && (
                                <Mouth
                                    toothNumber="maxilla"
                                    model={toothModels["../../assets/ma2.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    hasSelection={selectedTooth !== null}
                                />
                            )}

                        </>
                    )}

                    {/* MANDIBLE */}
                    {selectedJaw !== "upper" && (
                        <>

                            {showPermanent && (
                                <Mouth
                                    toothNumber="mandible"
                                    model={toothModels["../../assets/mb.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    hasSelection={selectedTooth !== null}
                                />
                            )}

                            {showPrimary && (
                                <Mouth
                                    toothNumber="mandible"
                                    model={toothModels["../../assets/mb2.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    hasSelection={selectedTooth !== null}
                                />
                            )}

                        </>
                    )}

                    {/* INDIVIDUAL TEETH */}
                    {filteredTeeth.map(renderTooth)}

                </Canvas>

            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-4">

                <div className="flex items-center gap-3 p-1">

                    <label className="font-semibold">
                        Dentition:
                    </label>

                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={selectedDentition}
                        onChange={(e) => {
                            setSelectedDentition(e.target.value);
                            setSelectedTooth(null);
                        }}
                    >
                        <option value="primary">Primary</option>
                        <option value="permanent">Permanent</option>
                    </select>

                </div>

                <div className="flex items-center gap-3 p-1">

                    <label className="font-semibold">
                        Jaw:
                    </label>

                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={selectedJaw}
                        onChange={(e) => {
                            setSelectedJaw(e.target.value);
                            setSelectedTooth(null);
                        }}
                    >
                        <option value="upper">Upper</option>
                        <option value="lower">Lower</option>
                        <option value="all">All</option>
                    </select>

                </div>

            </div>
        </>
    );
};

export default DentalChart3D;
