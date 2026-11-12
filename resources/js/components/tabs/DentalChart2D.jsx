
import React, { useEffect, useState } from 'react';
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from '../tooth/FourSurface';
import { route } from 'ziggy-js';
import api from '@/lib/axios.js';

const DentalChart2D = ({ setShowToothProcedure, setCurrentTooth }) => {

    const [teeth, setTeeth] = useState([]);

    useEffect(() => {
        const getAllTooth = async () => {
            try {
                const response = await api.get(route('getAllTooth'));
                const toothData = response.data;

                setTeeth(toothData);

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
        const ToothComponent =
            ["Central Incisor", "Lateral Incisor", "Canine"]
                .includes(tooth.tooth_name)
                ? FourSurface
                : FiveSurface;

        return (
            <ToothComponent
                key={tooth.tooth_number}
                toothNumber={tooth.tooth_number}
                onSelect={(surface) =>
                    handleClickSurface(tooth, surface)
                }
            />
        );
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

            {teeth.filter(t => t.tooth_type === "primary" && Number(t.quadrant) === 5).map(renderTooth)}
            {teeth.filter(t => t.tooth_type === "primary" && Number(t.quadrant) === 6).map(renderTooth)}

            <span></span>
            <span></span>
            <span></span>

            {teeth.filter(t => t.tooth_type === "permanent" && Number(t.quadrant) === 1).map(renderTooth)}
            {teeth.filter(t => t.tooth_type === "permanent" && Number(t.quadrant) === 2).map(renderTooth)}

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

            {teeth.filter(t => t.tooth_type === "permanent" && Number(t.quadrant) === 3).map(renderTooth)}
            {teeth.filter(t => t.tooth_type === "permanent" && Number(t.quadrant) === 4).map(renderTooth)}

            <span></span>
            <span></span>
            <span></span>

            {teeth.filter(t => t.tooth_type === "primary" && Number(t.quadrant) === 7).map(renderTooth)}
            {teeth.filter(t => t.tooth_type === "primary" && Number(t.quadrant) === 8).map(renderTooth)}

            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default DentalChart2D;
