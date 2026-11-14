import BoxCondition from "../BoxCondition";
import api from "@/lib/axios.js";

const Tretment = ({ toothFinding = [], laodToothFinding }) => {

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
                />
            ));
    };

    const renderSection = (procedures, status) => (
        <div className="border border-gray-300 p-5 flex flex-col gap-2 h-150 overflow-y-scroll">
            <h1 className="text-2xl pb-3 font-semibold">
                {status}
            </h1>
            {renderTemplate(procedures, status)}
        </div>
    );

    return (
        <div className="mt-10 mb-2 grid grid-cols-3 gap-3 overflow-x-scroll p-2">
            {renderSection(toothFinding, "Planning")}
            {renderSection(toothFinding, "In Progress")}
            {renderSection(toothFinding, "Completed")}
        </div>
    );
};

export default Tretment;
