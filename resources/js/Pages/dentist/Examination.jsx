import React, {useEffect, useState} from "react";
import MainLayout from "../../layout/mainLayout";
import PatientDetails from "@/components/tabs/PatientDetailsTab";
import ConsentTab from "@/components/tabs/ConsentTab";
import DentalChart2D from "@/components/tabs/DentalChart2D";
import PenandaWarna from "@/components/PenandaWarna";
import DentalChart3D from "@/components/tabs/DentalChart3D";
import Tretment from "@/components/tabs/Tretment";
import Medicine from "@/components/modal/Medicine";
import ToothProcedure from "@/components/modal/ToothProcedure";
import PageTitle from "@/components/layout/PageTitle.jsx";
import TabsHeader from "@/components/molecules/Examination/TabsHeader.jsx";
import MedicineTabb from "@/components/tabs/MedicineTabb.jsx";
import UpdateToothProcedure from "@/components/modal/UpdateToothProcedure.jsx";
import api from "@/lib/axios.js";
import {route} from "ziggy-js";

let linkTabs = [
    { text: "patient", label: "Patient Details" },
    { text: "chart", label: "Dental Chart" },
    { text: "3d", label: "3D" },
    { text: "medicine", label: "Medicine" },
    { text: "patientConsent", label: "Patient Consent" },
];

const Examination = () => {
    const [activeTab, setActiveTab] = useState("patient");
    const [patientDetails, setPatientDetails] = useState("");
    const [conditions, setConditions] = useState("");
    const [treatment, setTreatment] = useState("")
    const [surfaces, setSurfaces] = useState("")
    const [medicines, setMedicines] = useState("")
    const [toothFinding, setToothFinding] = useState("")

    const [showToothProcedure, setShowToothProcedure] = useState(false);
    const [showUpdateToothProcedure, setShowUpdateToothProcedure] = useState(false);
    const [showAddMedicine, setShowAddMedicine] = useState(false);

    const [currentTooth, setCurrentTooth] = useState(null);
    const [currentToothFinding, setCurrentToothFinding] = useState(null);

    const laodToothFinding = async () => {
        try {
            const id = window.location.pathname.split('/').pop();

            const response = await api.get(
                route("getFindingByPatientId", { id })
            );

            console.log(response)

            setToothFinding(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split('/').pop();

            const [
                patientResponse,
                conditionResponse,
                procedureResponse,
                surfaceResponse,
                medicineResponse,
                toothFindingResponse

            ] = await Promise.all([

                api.get(route('getPatientById', { id })),
                api.get(route('getAllCondition')),
                api.get(route('getAllProcedure')),
                api.get(route('getAllSurface')),
                api.get(route('getAllMedicine')),
                api.get(route('getFindingByPatientId', { id })),

            ]);

            setPatientDetails(patientResponse.data);
            setConditions(conditionResponse.data);
            setTreatment(procedureResponse.data);
            setSurfaces(surfaceResponse.data);
            setMedicines(medicineResponse.data)
            setToothFinding(toothFindingResponse.data)

        } catch (error) {
            console.log(error);
        }
    };

    const handleToothSelect = (toothNumber) => {
        console.log("Selected tooth:", toothNumber);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainLayout>
            {showAddMedicine && <Medicine /> }
            {showToothProcedure && (
                <ToothProcedure
                    setShowToothProcedure={setShowToothProcedure}
                    currentTooth={currentTooth}
                    setCurrentTooth={setCurrentTooth}
                    conditions={conditions}
                    treatment={treatment}
                    surfaces={surfaces}
                    patientDetails={patientDetails}
                    laodToothFinding={laodToothFinding}
                />
            )}
            {showUpdateToothProcedure && (<UpdateToothProcedure
                setShowUpdateToothProcedure={setShowUpdateToothProcedure}
                currentToothFinding={currentToothFinding}
                conditions={conditions}
                treatment={treatment}
                surfaces={surfaces}
                laodToothFinding={laodToothFinding}
            />)}

            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title={"Patients Examination"}/>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                   <TabsHeader setActiveTab={setActiveTab} linkTabs={linkTabs} activeTab={activeTab} />

                    <div className="w-full h-auto bg-white rounded mt-2">
                        {activeTab === "patient" && <PatientDetails patientDetails={patientDetails} />}
                        {activeTab === "chart" && <DentalChart2D
                            setShowToothProcedure={setShowToothProcedure}
                            setCurrentTooth={setCurrentTooth}
                            toothFinding={toothFinding}
                        /> }
                        {activeTab === "3d" && <DentalChart3D
                            toothFinding={toothFinding}
                            onSelect={handleToothSelect}
                        /> }
                        {activeTab === "patientConsent" && <ConsentTab />}
                        {activeTab === "medicine" && <MedicineTabb medicines={medicines} /> }
                    </div>

                    {activeTab === "chart" || activeTab === "3d" ? <PenandaWarna conditions={conditions} /> : "" }

                </div>

                {activeTab === "chart" || activeTab === "3d" ?
                    <Tretment
                        toothFinding={toothFinding}
                        laodToothFinding={laodToothFinding}
                        setShowUpdateToothProcedure={setShowUpdateToothProcedure}
                        setCurrentToothFinding={setCurrentToothFinding}
                    />
                    : "" }
            </div>
        </MainLayout>
    );
};

export default Examination;
