import BoxCondition from "../molecules/Examination/BoxCondition.jsx";
import api from "@/lib/axios.js";

const TretmentTab = ({
    toothFinding = [], laodToothFinding,
    setShowUpdateToothProcedure, setCurrentToothFinding }) => {

    const updateProcedureStatus = async (id,status) => {
        try {

            const response = await api.put(
                route("updateFindingStatus", { id }),
                { status: status }
            );

            laodToothFinding()

        }catch (error){
            console.log(error)
        }
    }

    const renderTemplate = (procedures, status) => {
        return procedures
            .filter((item) => item.status === status)
            .map((item) => (
                <BoxCondition
                    key={item.id}
                    procedure={item}
                    updateProcedureStatus={updateProcedureStatus}
                    setShowUpdateToothProcedure={setShowUpdateToothProcedure}
                    setCurrentToothFinding={setCurrentToothFinding}
                />
            ));
    };

    const renderSection = (procedures, status) => (
        <div className="border border-gray-300 p-5 flex h-auto flex-col gap-2 h-150">
            <h1 className="text-2xl pb-3 font-semibold">
                {status}
            </h1>
            {renderTemplate(procedures, status)}
        </div>
    );

    return (
        <div className="mt-10 mb-2 grid grid-cols-3 h-auto gap-3 p-2">
            {renderSection(toothFinding, "Planning")}
            {renderSection(toothFinding, "In Progress")}
            {renderSection(toothFinding, "Completed")}
        </div>
    );
};

export default TretmentTab;
