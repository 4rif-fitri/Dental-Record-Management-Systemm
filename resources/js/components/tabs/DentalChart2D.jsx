
import React from 'react';
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from '../tooth/FourSurface';

const teeth = [
    // Upper Right - Permanent
    { tooth_number: "18", tooth_name: "Third Molar", jaw: "upper", quadrant: 1, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "17", tooth_name: "Second Molar", jaw: "upper", quadrant: 1, set: "permanent", numberOfsurface: 5},
    { tooth_number: "16", tooth_name: "First Molar", jaw: "upper", quadrant: 1, set: "permanent" , numberOfsurface: 5},
    { tooth_number: "15", tooth_name: "Second Premolar", jaw: "upper", quadrant: 1, set: "permanent" , numberOfsurface: 5},
    { tooth_number: "14", tooth_name: "First Premolar", jaw: "upper", quadrant: 1, set: "permanent" , numberOfsurface: 5},
    { tooth_number: "13", tooth_name: "Canine", jaw: "upper", quadrant: 1, set: "permanent", numberOfsurface: 4},
    { tooth_number: "12", tooth_name: "Lateral Incisor", jaw: "upper", quadrant: 1, set: "permanent", numberOfsurface: 4},
    { tooth_number: "11", tooth_name: "Central Incisor", jaw: "upper", quadrant: 1, set: "permanent", numberOfsurface: 4},

    // Upper Left - Permanent
    { tooth_number: "21", tooth_name: "Central Incisor", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 4},
    { tooth_number: "22", tooth_name: "Lateral Incisor", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "23", tooth_name: "Canine", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "24", tooth_name: "First Premolar", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "25", tooth_name: "Second Premolar", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "26", tooth_name: "First Molar", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "27", tooth_name: "Second Molar", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "28", tooth_name: "Third Molar", jaw: "upper", quadrant: 2, set: "permanent", numberOfsurface: 5 },

    // Lower Left - Permanent
    { tooth_number: "38", tooth_name: "Third Molar", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "37", tooth_name: "Second Molar", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "36", tooth_name: "First Molar", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "35", tooth_name: "Second Premolar", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "34", tooth_name: "First Premolar", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "33", tooth_name: "Canine", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "32", tooth_name: "Lateral Incisor", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "31", tooth_name: "Central Incisor", jaw: "lower", quadrant: 3, set: "permanent", numberOfsurface: 4 },

    // Lower Right - Permanent
    { tooth_number: "41", tooth_name: "Central Incisor", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "42", tooth_name: "Lateral Incisor", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "43", tooth_name: "Canine", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 4 },
    { tooth_number: "44", tooth_name: "First Premolar", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "45", tooth_name: "Second Premolar", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "46", tooth_name: "First Molar", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "47", tooth_name: "Second Molar", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 5 },
    { tooth_number: "48", tooth_name: "Third Molar", jaw: "lower", quadrant: 4, set: "permanent", numberOfsurface: 5 },

    // Upper Right - Primary
    { tooth_number: "55", tooth_name: "Second Molar", jaw: "upper", quadrant: 5, set: "primary", numberOfsurface: 5 },
    { tooth_number: "54", tooth_name: "First Molar", jaw: "upper", quadrant: 5, set: "primary", numberOfsurface: 5 },
    { tooth_number: "53", tooth_name: "Canine", jaw: "upper", quadrant: 5, set: "primary", numberOfsurface: 4 },
    { tooth_number: "52", tooth_name: "Lateral Incisor", jaw: "upper", quadrant: 5, set: "primary", numberOfsurface: 4 },
    { tooth_number: "51", tooth_name: "Central Incisor", jaw: "upper", quadrant: 5, set: "primary", numberOfsurface: 4 },

    // Upper Left - Primary
    { tooth_number: "61", tooth_name: "Central Incisor", jaw: "upper", quadrant: 6, set: "primary", numberOfsurface: 4 },
    { tooth_number: "62", tooth_name: "Lateral Incisor", jaw: "upper", quadrant: 6, set: "primary", numberOfsurface: 4 },
    { tooth_number: "63", tooth_name: "Canine", jaw: "upper", quadrant: 6, set: "primary", numberOfsurface: 4 },
    { tooth_number: "64", tooth_name: "First Molar", jaw: "upper", quadrant: 6, set: "primary", numberOfsurface: 5 },
    { tooth_number: "65", tooth_name: "Second Molar", jaw: "upper", quadrant: 6, set: "primary", numberOfsurface: 5 },

    // Lower Left - Primary
    { tooth_number: "75", tooth_name: "Second Molar", jaw: "lower", quadrant: 7, set: "primary" },
    { tooth_number: "74", tooth_name: "First Molar", jaw: "lower", quadrant: 7, set: "primary" },
    { tooth_number: "73", tooth_name: "Canine", jaw: "lower", quadrant: 7, set: "primary" },
    { tooth_number: "72", tooth_name: "Lateral Incisor", jaw: "lower", quadrant: 7, set: "primary" },
    { tooth_number: "71", tooth_name: "Central Incisor", jaw: "lower", quadrant: 7, set: "primary" },

    // Lower Right - Primary
    { tooth_number: "81", tooth_name: "Central Incisor", jaw: "lower", quadrant: 8, set: "primary" },
    { tooth_number: "82", tooth_name: "Lateral Incisor", jaw: "lower", quadrant: 8, set: "primary" },
    { tooth_number: "83", tooth_name: "Canine", jaw: "lower", quadrant: 8, set: "primary" },
    { tooth_number: "84", tooth_name: "First Molar", jaw: "lower", quadrant: 8, set: "primary" },
    { tooth_number: "85", tooth_name: "Second Molar", jaw: "lower", quadrant: 8, set: "primary" },
];

const DentalChart2D = ({setShowToothProcedure, setCurrentTooth}) => {

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
            {teeth.filter(t => t.set === "primary" && t.quadrant === 5).map(renderTooth)}
            {teeth.filter(t => t.set === "primary" && t.quadrant === 6).map(renderTooth)}
            <span></span>
            <span></span>
            <span></span>


            {teeth.filter(t => t.set === "permanent" && t.quadrant === 1).map(renderTooth)}
            {teeth.filter(t => t.set === "permanent" && t.quadrant === 2).map(renderTooth)}

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

            {teeth.filter(t => t.set === "permanent" && t.quadrant === 3).map(renderTooth)}
            {teeth.filter(t => t.set === "permanent" && t.quadrant === 4).map(renderTooth)}

            <span></span>
            <span></span>
            <span></span>

            {teeth.filter(t => t.set === "primary" && t.quadrant === 7).map(renderTooth)}
            {teeth.filter(t => t.set === "primary" && t.quadrant === 8).map(renderTooth)}

            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default DentalChart2D;
