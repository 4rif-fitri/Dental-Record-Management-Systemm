import React, {useEffect, useState} from "react";
import MainLayout from "../../layout/mainLayout";
import PatientDetails from "../../components/tabs/PatientDetailsTab";
import ConsentTab from "../../components/tabs/ConsentTab";
import MedicineTab from "../../components/tabs/medicineTab";
import PhotosTab from "../../components/tabs/photosTab";
import DentalChart2D from "../../components/tabs/DentalChart2D";
import PenandaWarna from "../../components/PenandaWarna";
import DentalChart3D from "../../components/tabs/DentalChart3D";
import Tretment from "../../components/tabs/Tretment";
import Medicine from "../../components/modal/Medicine";
import ToothProcedure from "../../components/modal/ToothProcedure";
import {route} from "ziggy-js";
import api from "@/lib/axios.js";
import PageTitle from "@/components/layout/PageTitle.jsx";
import TabsHeader from "@/components/molecules/Examination/TabsHeader.jsx";

let linkTabs = [
    { text: "patient", label: "Patient Details" },
    { text: "chart", label: "Dental Chart" },
    { text: "3d", label: "3D" },
    { text: "medicine", label: "Medicine" },
    { text: "patientConsent", label: "Patient Consent" },
];

const Examination = () => {
    let [activeTab, setActiveTab] = useState("patient");
    let [examination, setExamination] = useState("");
    let [patientDetails, setPatientDetails] = useState("");

    let [showToothProcedure, setShowToothProcedure] = useState(false);
    let [showAddMedicine, setShowAddMedicine] = useState(false);

    const [currentTooth, setCurrentTooth] = useState(null);
    const [selectedSurfacesByTooth, setSelectedSurfacesByTooth] = useState({});

    const getPatientDetails = async (id) => {
        try {
            const response = await api.get(
                route('getPatientById', { id })
            );
            setPatientDetails(response.data)
            setExamination(response.data.examinations)

        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();
        getPatientDetails(id)
    },[])

    return (
        <MainLayout>
            {showAddMedicine && <Medicine showAddMedicine={showAddMedicine}/> }
            {showToothProcedure && (
                <ToothProcedure
                    showToothProcedure={showToothProcedure}
                    setShowToothProcedure={setShowToothProcedure}
                    currentTooth={currentTooth}
                    setCurrentTooth={setCurrentTooth}
                />
            )}

            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title={"Patients Examination"}/>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                   <TabsHeader setActiveTab={setActiveTab} linkTabs={linkTabs} activeTab={activeTab} />

                    <div className="w-full h-auto bg-white rounded mt-2">
                        {activeTab === "patient" && <PatientDetails patientDetails={patientDetails} />}
                        {activeTab === "chart" && <DentalChart2D
                            setShowToothProcedure={setShowToothProcedure}
                            setCurrentTooth={setCurrentTooth}
                        /> }
                        {activeTab === "3d" && <DentalChart3D /> }
                        {activeTab === "patientConsent" && <ConsentTab />}
                        {activeTab === "medicine" && <MedicineTab activeTab={activeTab} /> }
                    </div>

                    {activeTab === "chart" || activeTab === "3d" ? <PenandaWarna /> : "" }

                </div>

                {activeTab === "chart" || activeTab === "3d" ? <Tretment/> : "" }
            </div>
        </MainLayout>
    );
};

export default Examination;
