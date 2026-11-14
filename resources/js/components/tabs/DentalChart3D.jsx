
import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Tooth from '../tooth/Tooth';
import Mouth from '../tooth/Mouth';

const toothModels = import.meta.glob("../../assets/*.glb", {
    eager: true,
    query: "?url",
    import: "default",
});

const teeth = [
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

const DentalChart3D = ({ onSelect, toothFinding = [] }) => {

    // all = Upper + Lower
    // upper = Maxilla
    // lower = Mandible
    const [selectedJaw, setSelectedJaw] = useState("all");

    const getLatestFinding = (toothNumber) => {

        const findings = toothFinding.filter(item =>
            String(item.tooth?.tooth_number) === String(toothNumber)
        );

        if (findings.length === 0) return null;

        return [...findings].sort((a, b) => {

            const dateCompare =
                new Date(b.created_at) - new Date(a.created_at);

            return dateCompare || Number(b.id) - Number(a.id);

        })[0];

    };

    // Filter teeth based on selected jaw
    const filteredTeeth = teeth.filter(tooth => {

        const firstDigit = String(tooth.number)[0];

        if (selectedJaw === "upper") {
            return firstDigit === "1" || firstDigit === "2";
        }

        if (selectedJaw === "lower") {
            return firstDigit === "3" || firstDigit === "4";
        }

        return true;

    });

    return (
        <>
            <div className="h-150 gap-0 bg-black overflow-hidden">

                <Canvas camera={{ position: [0, 0.25, 0.75] }}>

                    <ambientLight intensity={2} />

                    <OrbitControls />

                    {/* MAXILLA */}
                    {selectedJaw !== "lower" && (
                        <Mouth
                            toothNumber="maxilla"
                            model={toothModels["../../assets/ma.glb"]}
                            position={[0, -0.175, 0]}
                            rotation={[0, 0, 0]}
                            onSelect={onSelect}
                        />
                    )}

                    {/* MANDIBLE */}
                    {selectedJaw !== "upper" && (
                        <Mouth
                            toothNumber="mandible"
                            model={toothModels["../../assets/mb.glb"]}
                            position={[0, -0.175, 0]}
                            rotation={[0, 0, 0]}
                            onSelect={onSelect}
                        />
                    )}

                    {/* INDIVIDUAL TEETH */}
                    {filteredTeeth.map((tooth) => {

                        const finding = getLatestFinding(tooth.number);

                        return (
                            <Tooth
                                key={tooth.number}
                                toothNumber={tooth.number}
                                model={tooth.model}
                                position={[0, -0.175, 0]}
                                rotation={[0, 0, 0]}
                                onSelect={onSelect}
                                finding={finding}
                                conditionColor={
                                    finding?.condition?.color_code || null
                                }
                            />
                        );

                    })}

                </Canvas>

            </div>

            <div className="flex gap-3 justify-around">

                {/* PRIMARY / PERMANENT */}
                <div className="flex gap-3 p-1">

                    <button className="bg-white p-2 rounded border">
                        Primary
                    </button>

                    <button className="bg-white p-2 rounded border">
                        Permanent
                    </button>

                </div>

                {/* UPPER / LOWER */}
                <div className="flex gap-3 p-1">

                    <button
                        onClick={() => setSelectedJaw("upper")}
                        className={`p-2 rounded border ${
                            selectedJaw === "upper"
                                ? "bg-blue-700 text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        Upper
                    </button>

                    <button
                        onClick={() => setSelectedJaw("lower")}
                        className={`p-2 rounded border ${
                            selectedJaw === "lower"
                                ? "bg-blue-700 text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        Lower
                    </button>

                    <button
                        onClick={() => setSelectedJaw("all")}
                        className={`p-2 rounded border ${
                            selectedJaw === "all"
                                ? "bg-blue-700 text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        All
                    </button>

                </div>

            </div>
        </>
    );
};

export default DentalChart3D;
