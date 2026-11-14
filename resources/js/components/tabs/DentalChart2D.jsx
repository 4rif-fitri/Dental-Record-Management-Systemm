import React, { useEffect, useState } from 'react';
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from '../tooth/FourSurface';
import { route } from 'ziggy-js';
import api from '@/lib/axios.js';

const DentalChart2D = ({ setShowToothProcedure, setCurrentTooth, toothFinding }) => {
    console.log(toothFinding)

    const [teeth, setTeeth] = useState([]);

    useEffect(() => {
        const getAllTooth = async () => {
            try {
                const response = await api.get(route('getAllTooth'));
                console.log(response)

                setTeeth(response.data);

            } catch (error) {
                console.error('Failed to get teeth:', error);
            }
        };

        getAllTooth();
    }, []);

    const handleClickSurface = (tooth, surface) => {
        setCurrentTooth(prev => {
            const existing =
                prev?.tooth_number === tooth.tooth_number
                    ? prev.selected_surfaces || []
                    : [];

            const updated = existing.includes(surface)
                ? existing.filter(item => item !== surface)
                : [...existing, surface];

            return {
                ...tooth,
                selected_surfaces: updated
            };
        });

        setShowToothProcedure(true);
    };

    const renderTooth = (tooth) => {

        const findings = toothFinding?.filter(
            item => Number(item.tooth_id) === Number(tooth.id)
        ) || [];

        const latestFinding = findings.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0] || null;

        const ToothComponent =
            ["Central Incisor", "Lateral Incisor", "Canine"]
                .includes(tooth.tooth_name)
                ? FourSurface
                : FiveSurface;

        return (
            <ToothComponent
                key={tooth.tooth_number}
                toothNumber={tooth.tooth_number}
                currentTooth={latestFinding}
                onSelect={(surface) =>
                    handleClickSurface(tooth, surface)
                }
            />
        );
    };

    const renderQuadrant = (type, quadrant) => {
        const filtered = teeth.filter(t =>
            t.tooth_type === type &&
            Number(t.quadrant) === quadrant
        );

        const sorted = filtered.sort((a, b) =>
            Number(a.tooth_number) - Number(b.tooth_number)
        );

        return (
            [1, 4, 5, 8].includes(quadrant)
                ? sorted.reverse()
                : sorted
        ).map(renderTooth);
    };

    const primaryNumbers = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];

    const upperPermanent = [
        18, 17, 16, 15, 14, 13, 12, 11,
        21, 22, 23, 24, 25, 26, 27, 28
    ];

    const lowerPermanent = [
        48, 47, 46, 45, 44, 43, 42, 41,
        31, 32, 33, 34, 35, 36, 37, 38
    ];

    const primaryNumbersLower = [85,84,83,82,81,71,72,73,74,75];

    const renderNumber = (numbers) => {
        return numbers.map((number, index) => (
            <span
                key={`${number}-${index}`}
                className={`flex justify-center items-end font-semibold`}
            >
            {number}
        </span>
        ));
    }

    const renderDualNumber = (upperNumbers, lowerNumbers) => {
        return upperNumbers.map((number, index) => (
            <span key={number} className="grid grid-rows-2 font-semibold">
            <p className="flex justify-center items-start border border-t-0 border-l-0 border-r-0">
                {number}
            </p>

            <p className="flex justify-center items-end">
                {lowerNumbers[index]}
            </p>
        </span>
        ));
    };

    return (
        <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] grid-rows-5 gap-0">

            <span></span>
            <span></span>
            <span></span>

            {renderNumber(primaryNumbers)}

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            {renderQuadrant("primary", 5)}
            {renderQuadrant("primary", 6)}

            <span></span>
            <span></span>
            <span></span>

            {renderQuadrant("permanent", 1)}
            {renderQuadrant("permanent", 2)}

            {renderDualNumber(upperPermanent, lowerPermanent)}

            {renderQuadrant("permanent", 3)}
            {renderQuadrant("permanent", 4)}

            <span></span>
            <span></span>
            <span></span>

            {renderQuadrant("primary", 7)}
            {renderQuadrant("primary", 8)}

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            {renderNumber(primaryNumbersLower)}

        </div>
    );
};

export default DentalChart2D;
