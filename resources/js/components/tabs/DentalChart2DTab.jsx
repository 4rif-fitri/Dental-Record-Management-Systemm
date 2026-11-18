import React, { useEffect, useState } from 'react';
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from '../tooth/FourSurface';
import { route } from 'ziggy-js';
import api from '@/lib/axios.js';
import {usePage} from "@inertiajs/react";

const DentalChart2DTab = ({ setShowToothProcedure, setCurrentTooth, toothFinding,currentTooth }) => {
    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;

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
        const updatedTooth = {
            ...tooth,
            selected_surfaces: []
        };

        setCurrentTooth(updatedTooth);

        if(currentRole === "dentist"){
            setShowToothProcedure(true);
        }
    };

    const renderTooth = (tooth) => {

        const findings = toothFinding?.filter(
            item => Number(item.tooth_id) === Number(tooth.id)
        ) || [];

        const latestFinding = findings.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0] || null;

        let id = latestFinding?.tooth?.tooth_number;

        const element = document.getElementById(`tooth-${id}`);

        if (element) {
            element.innerText = latestFinding?.condition.condition_code
        }

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
                    handleClickSurface(tooth, "")
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
            <p className="flex justify-center items-start border-t-0 border-l-0 border-r-0 mb-7.5">
                {number}
            </p>

            <p className="flex justify-center items-end">
                {lowerNumbers[index]}
            </p>
        </span>
        ));
    };

    return (
        <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1">

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

            <span id={`tooth-55`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-54`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-53`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-52`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-51`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-61`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-62`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-63`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-64`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-65`} className={"flex h-7 justify-center border"}></span>

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

            <span id={`tooth-18`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-17`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-16`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-15`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-14`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-13`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-12`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-11`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-21`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-22`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-23`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-24`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-25`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-26`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-27`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-28`} className={"flex h-7 justify-center border"}></span>

            {renderDualNumber(upperPermanent, lowerPermanent)}

            <span id={`tooth-48`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-47`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-46`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-45`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-44`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-43`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-42`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-41`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-31`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-32`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-33`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-34`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-35`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-36`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-37`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-38`} className={"flex h-7 justify-center border"}></span>

            {renderQuadrant("permanent", 4)}
            {renderQuadrant("permanent", 3)}

            <span></span>
            <span></span>
            <span></span>

            {renderQuadrant("primary", 8)}
            {renderQuadrant("primary", 7)}

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <span id={`tooth-85`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-84`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-83`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-82`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-81`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-71`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-72`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-73`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-74`} className={"flex h-7 justify-center border"}></span>
            <span id={`tooth-75`} className={"flex h-7 justify-center border"}></span>

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

export default DentalChart2DTab;
