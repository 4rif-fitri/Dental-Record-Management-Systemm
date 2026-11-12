import BoxCondition from "../BoxCondition";
import {useState} from "react";

const Tretment = ({updateProcedureStatus }) => {

    const [procedures, setProcedures] = useState([
        {
            id: 1,
            tooth: "16",
            typeTooth: "Molar",
            condition: "Dental Caries",
            treatment: "Dental Filling",
            status: "Planning",
        },
        {
            id: 2,
            tooth: "21",
            typeTooth: "Acenter",
            condition: "Fractured Tooth",
            treatment: "Composite Restoration",
            status: "In Progress",
        },
        {
            id: 3,
            tooth: "11",
            typeTooth: "Acenter",
            condition: "Dental Caries",
            treatment: "Dental Filling",
            status: "Completed",
        },
    ]);

    let renderTemplate = (procedures, status) => {
        return procedures
            .filter((item) => item.status === status)
            .map((item) => (
                <BoxCondition
                    key={item.id}
                    procedure={item}
                    updateProcedureStatus={updateProcedureStatus}
                />
            ));
    };

    let renderSection = (procedures, status) => {
        return (
            <div className="border-1 border-gray-300 p-5 flex flex-col gap-2 h-150 overflow-y-scroll">
                <h1 className="text-2xl pb-3 font-semibold">{status}</h1>
                {renderTemplate(procedures, status)}
            </div>
        );
    };

    return (
        <div className="mt-10 mb-2 grid grid-cols-3 gap-3 border-gray-300 overflow-x-scroll p-2">
            {renderSection(procedures, "Planning")}
            {renderSection(procedures, "In Progress")}
            {renderSection(procedures, "Completed")}
        </div>
    );
};

export default Tretment;
