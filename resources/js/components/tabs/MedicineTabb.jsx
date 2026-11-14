import React, {useEffect, useState} from 'react'

const MedicineTab = ({examinationMedicine = [],setShowAddMedicine}) => {

    console.log(examinationMedicine)

    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl pb-3 font-semibold">Medicine</h1>
                <button onClick={() => setShowAddMedicine(true)} className="btn btn-primary w-40">
                    Add Medicine
                </button>
            </div>
            <div className="h-75 overflow-y-scroll border border-gray-500 p-3 w-full rounded flex flex-col gap-2">
                {examinationMedicine.map((medicine) => (
                    <div key={medicine.id} className="w-full rounded border border-gray-500 p-3 flex justify-between">
                        <h2>{medicine.name}</h2>
                        <h2>{medicine.notes}</h2>
                        <button>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicineTab;
