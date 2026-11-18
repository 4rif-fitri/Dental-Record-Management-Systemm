
import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Tooth from '../tooth/Tooth';
import Mouth from '../tooth/Mouth';
import {usePage} from "@inertiajs/react";

const toothModels = import.meta.glob("../../assets/*.glb", {
    eager: true,
    query: "?url",
    import: "default",
});

const permanentTeeth = [

    { number: 18, model: toothModels["../../assets/18.glb"] },
    { number: 17, model: toothModels["../../assets/17.glb"] },
    { number: 16, model: toothModels["../../assets/16.glb"] },
    { number: 15, model: toothModels["../../assets/15.glb"] },
    { number: 14, model: toothModels["../../assets/14.glb"] },
    { number: 13, model: toothModels["../../assets/13.glb"] },
    { number: 12, model: toothModels["../../assets/12.glb"] },
    { number: 11, model: toothModels["../../assets/11.glb"] },

    { number: 21, model: toothModels["../../assets/21.glb"] },
    { number: 22, model: toothModels["../../assets/22.glb"] },
    { number: 23, model: toothModels["../../assets/23.glb"] },
    { number: 24, model: toothModels["../../assets/24.glb"] },
    { number: 25, model: toothModels["../../assets/25.glb"] },
    { number: 26, model: toothModels["../../assets/26.glb"] },
    { number: 27, model: toothModels["../../assets/27.glb"] },
    { number: 28, model: toothModels["../../assets/28.glb"] },

    { number: 48, model: toothModels["../../assets/48.glb"] },
    { number: 47, model: toothModels["../../assets/47.glb"] },
    { number: 46, model: toothModels["../../assets/46.glb"] },
    { number: 45, model: toothModels["../../assets/45.glb"] },
    { number: 44, model: toothModels["../../assets/44.glb"] },
    { number: 43, model: toothModels["../../assets/43.glb"] },
    { number: 42, model: toothModels["../../assets/42.glb"] },
    { number: 41, model: toothModels["../../assets/41.glb"] },

    { number: 31, model: toothModels["../../assets/31.glb"] },
    { number: 32, model: toothModels["../../assets/32.glb"] },
    { number: 33, model: toothModels["../../assets/33.glb"] },
    { number: 34, model: toothModels["../../assets/34.glb"] },
    { number: 35, model: toothModels["../../assets/35.glb"] },
    { number: 36, model: toothModels["../../assets/36.glb"] },
    { number: 37, model: toothModels["../../assets/37.glb"] },
    { number: 38, model: toothModels["../../assets/38.glb"] },

];

const primaryTeeth = [

    { number: 55, model: toothModels["../../assets/55.glb"] },
    { number: 54, model: toothModels["../../assets/54.glb"] },
    { number: 53, model: toothModels["../../assets/53.glb"] },
    { number: 52, model: toothModels["../../assets/52.glb"] },
    { number: 51, model: toothModels["../../assets/51.glb"] },

    { number: 61, model: toothModels["../../assets/61.glb"] },
    { number: 62, model: toothModels["../../assets/62.glb"] },
    { number: 63, model: toothModels["../../assets/63.glb"] },
    { number: 64, model: toothModels["../../assets/64.glb"] },
    { number: 65, model: toothModels["../../assets/65.glb"] },

    { number: 85, model: toothModels["../../assets/85.glb"] },
    { number: 84, model: toothModels["../../assets/84.glb"] },
    { number: 83, model: toothModels["../../assets/83.glb"] },
    { number: 82, model: toothModels["../../assets/82.glb"] },
    { number: 81, model: toothModels["../../assets/81.glb"] },

    { number: 71, model: toothModels["../../assets/71.glb"] },
    { number: 72, model: toothModels["../../assets/72.glb"] },
    { number: 73, model: toothModels["../../assets/73.glb"] },
    { number: 74, model: toothModels["../../assets/74.glb"] },
    { number: 75, model: toothModels["../../assets/75.glb"] },

];

const DentalChart3D = ({ onSelect, toothFinding = [] }) => {

    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;

    const [selectedJaw, setSelectedJaw] = useState("all");
    const [selectedDentition, setSelectedDentition] = useState("permanent");

    const getLatestFinding = (toothNumber) => {

        const findings = toothFinding.filter(item =>
            String(item.tooth?.tooth_number) === String(toothNumber)
        );

        if (findings.length === 0) return null;

        return [...findings].sort((a, b) => {

            const dateCompare = new Date(b.created_at) - new Date(a.created_at);

            return dateCompare || Number(b.id) - Number(a.id);

        })[0];

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
            <div className="h-120 gap-0 bg-black overflow-hidden">

                <Canvas
                    key={selectedDentition}
                    camera={{ position: [0, 0.25, 0.75] }}
                >

                    <ambientLight intensity={2} />

                    <OrbitControls />

                    {selectedJaw !== "lower" && (
                        <>
                            {showPermanent && (
                                <Mouth
                                    toothNumber="maxilla"
                                    model={toothModels["../../assets/ma.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    onSelect={onSelect}
                                />
                            )}

                            {showPrimary && (
                                <Mouth
                                    toothNumber="maxilla"
                                    model={toothModels["../../assets/ma2.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    onSelect={onSelect}
                                />
                            )}

                        </>
                    )}

                    {selectedJaw !== "upper" && (
                        <>
                            {showPermanent && (
                                <Mouth
                                    toothNumber="mandible"
                                    model={toothModels["../../assets/mb.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    onSelect={onSelect}
                                />
                            )}

                            {showPrimary && (
                                <Mouth
                                    toothNumber="mandible"
                                    model={toothModels["../../assets/mb2.glb"]}
                                    position={[0, -0.175, 0]}
                                    rotation={[0, 0, 0]}
                                    onSelect={onSelect}
                                />
                            )}

                        </>
                    )}

                    {filteredTeeth.map((tooth) => {

                        const finding = getLatestFinding(tooth.number);

                        if (!tooth.model) {
                            console.error(
                                `Model ${tooth.number}.glb tidak dijumpai`
                            );
                            return null;
                        }

                        return (
                            <Tooth
                                key={tooth.number}
                                toothNumber={tooth.number}
                                model={tooth.model}
                                position={[0, -0.175, 0]}
                                rotation={[0, 0, 0]}
                                {...(currentRole === "dentist" ? { onSelect } : {})}
                                finding={finding}
                                conditionColor={
                                    finding?.condition?.color_code || null
                                }
                            />
                        );

                    })}

                </Canvas>

            </div>
            <div className="flex flex-wrap gap-4">

                <div className="flex items-center gap-3 p-1">

                    <label className="font-semibold">
                        Dentition:
                    </label>

                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={selectedDentition}
                        onChange={(e) => setSelectedDentition(e.target.value)}
                    >
                        <option value="primary">Primary</option>
                        <option value="permanent">Permanent</option>
                    </select>

                </div>

                <div className="flex items-center gap-3 p-1">

                    <label className="font-semibold">
                        Jaw:
                    </label>

                    <select className="select select-bordered w-full max-w-xs"
                        value={selectedJaw}
                        onChange={(e) => setSelectedJaw(e.target.value)}
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
