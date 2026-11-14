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

        // Cari semua finding untuk gigi ini
        const findings = toothFinding?.filter(
            item => Number(item.tooth_id) === Number(tooth.id)
        ) || [];

        // Ambil finding paling latest
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

    return (
        <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] grid-rows-4 gap-0">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
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

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

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
        </div>
    );
};

export default DentalChart2D;
