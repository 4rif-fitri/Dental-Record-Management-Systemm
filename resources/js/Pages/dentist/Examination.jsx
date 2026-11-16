import React, {useEffect, useState} from "react";
import MainLayout from "../../layout/mainLayout";
import PatientDetails from "@/components/tabs/PatientDetailsTab";
import ConsentTab from "@/components/tabs/ConsentTab";
import DentalChart2D from "@/components/tabs/DentalChart2DTab";
import DentalChart3D from "@/components/tabs/DentalChart3D";
import Tretment from "@/components/tabs/TretmentTab";
import Medicine from "@/components/modal/MedicineModal";
import ToothProcedure from "@/components/modal/ToothRecordModal";
import PageTitle from "@/components/atom/PageTitle";
import TabsHeader from "@/components/molecules/Examination/TabsHeader.jsx";
import UpdateToothProcedure from "@/components/modal/UpdateToothRecordModal.jsx";
import MedicineTab from "@/components/tabs/MedicineTab.jsx";
import PenandaWarna from "@/components/molecules/Examination/PenandaWarna.jsx";
import api from "@/lib/axios.js";
import {route} from "ziggy-js";

let linkTabs = [
    { text: "patient", label: "Patient Details" },
    { text: "chart", label: "Dental Chart" },
    { text: "3d", label: "3D" },
    { text: "medicine", label: "MedicineModal" },
    { text: "patientConsent", label: "Patient Consent" },
];

const Examination = () => {
    const [activeTab, setActiveTab] = useState("patient");
    const [patientDetails, setPatientDetails] = useState("");
    const [conditions, setConditions] = useState([]);
    const [treatment, setTreatment] = useState([]);
    const [surfaces, setSurfaces] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [toothFinding, setToothFinding] = useState([]);
    const [tooth, setTooth] = useState([]);
    const [examinationMedicine, setExaminationMedicine] = useState([])
    const [surfaceCondition, setSurfaceCondition] = useState([])

    const [showToothProcedure, setShowToothProcedure] = useState(false);
    const [showUpdateToothProcedure, setShowUpdateToothProcedure] = useState(false);
    const [showAddMedicine, setShowAddMedicine] = useState(false);

    const [currentTooth, setCurrentTooth] = useState(null);
    const [currentToothFinding, setCurrentToothFinding] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [activeFilter, setActiveFilter] = useState("ALL");

    const [isLoading, setIsLoading] = useState(true);

    const laodToothFinding = async () => {
        try {
            const id = window.location.pathname.split('/').pop();

            const response = await api.get(
                route("getFindingByPatientId", { id })
            );

            setToothFinding(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const filteredToothFinding = activeFilter === "ALL"
        ? toothFinding
        : toothFinding.filter(
            item => item.status === activeFilter
        );

    const getExaminationMedicine = async () => {
        try {
            const id = window.location.pathname.split('/').pop();

            const response = await api.get(
                route('getExaminationMedicineByPatientId', { id })
            );

            setExaminationMedicine(response.data ?? []);

        } catch (error) {
            console.error(
                "Error loading medicine:",
                error.response?.data || error.message
            );
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const id = window.location.pathname.split('/').pop();

            const [
                patientResponse,
                conditionResponse,
                procedureResponse,
                surfaceResponse,
                medicineResponse,
                toothFindingResponse,
                toothResponse,
                examinationMedicineResponse,
                surfaceConditionResponse,


            ] = await Promise.all([

                api.get(route('getPatientById', { id })),
                api.get(route('getAllCondition')),
                api.get(route('getAllProcedure')),
                api.get(route('getAllSurface')),
                api.get(route('getAllMedicine')),
                api.get(route('getFindingByPatientId', { id })),
                api.get(route('getAllTooth')),
                api.get(route('getExaminationMedicineByPatientId', { id })),
                api.get(route('getAllSurfaceCondition')),

            ]);

            setPatientDetails(patientResponse.data);
            setConditions(conditionResponse.data);
            setTreatment(procedureResponse.data);
            setSurfaces(surfaceResponse.data);
            setMedicines(medicineResponse.data);
            setToothFinding(toothFindingResponse.data);
            setTooth(toothResponse.data);
            setExaminationMedicine(examinationMedicineResponse.data ?? []);
            setSurfaceCondition(surfaceConditionResponse.data)

        } catch (error) {

            console.error(
                "Error fetching examination data:",
                error.response?.data || error.message
            );

        } finally {

            setIsLoading(false);

        }
    };

    const handleToothSelect = (toothNumber) => {

        const selectedTooth = tooth.find(item =>
            String(item.tooth_number) === String(toothNumber)
        );

        if (!selectedTooth) {
            console.log("Tooth not found:", toothNumber);
            return;
        }

        setCurrentTooth(selectedTooth);
        setShowToothProcedure(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainLayout>

            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">

                    <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

                    <h2 className="mt-5 text-lg font-semibold text-gray-800">
                        Loading Examination
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Please wait while we prepare patient information...
                    </p>

                </div>
            )}

            {showAddMedicine &&
                <Medicine
                    medicines={medicines}
                    setShowAddMedicine={setShowAddMedicine}
                    patientDetails={patientDetails}
                    getExaminationMedicine={getExaminationMedicine}
                    selectedMedicine={selectedMedicine}
                />
            }

            {showToothProcedure &&
                <ToothProcedure
                    setShowToothProcedure={setShowToothProcedure}
                    currentTooth={currentTooth}
                    setCurrentTooth={setCurrentTooth}
                    conditions={conditions}
                    treatment={treatment}
                    surfaces={surfaces}
                    patientDetails={patientDetails}
                    laodToothFinding={laodToothFinding}
                    surfaceCondition={surfaceCondition}
                />
            }

            {showUpdateToothProcedure &&
                <UpdateToothProcedure
                    setShowUpdateToothProcedure={setShowUpdateToothProcedure}
                    currentToothFinding={currentToothFinding}
                    conditions={conditions}
                    treatment={treatment}
                    surfaces={surfaces}
                    laodToothFinding={laodToothFinding}
                    surfaceCondition={surfaceCondition}
                    currentTooth={currentTooth}
                />
            }

            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title={"Patients Examination"}/>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                   <TabsHeader setActiveTab={setActiveTab} linkTabs={linkTabs} activeTab={activeTab} />

                    {(activeTab === "chart" || activeTab === "3d") && (
                        <div className="flex items-center gap-3 mt-3 border-t pt-3">

                            <label className="font-semibold">
                                Filter:
                            </label>

                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={activeFilter}
                                onChange={(e) => setActiveFilter(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="Planning">Planning</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                        </div>
                    )}

                    <div className="w-full h-auto bg-white rounded mt-2">
                        {activeTab === "patient" &&
                            <PatientDetails
                                patientDetails={patientDetails}
                            />
                        }

                        {activeTab === "chart" &&
                            <DentalChart2D
                                setShowToothProcedure={setShowToothProcedure}
                                setCurrentTooth={setCurrentTooth}
                                currentTooth={currentTooth}
                                toothFinding={filteredToothFinding}
                            />
                        }

                        {activeTab === "3d" &&
                            <DentalChart3D
                                toothFinding={filteredToothFinding}
                                onSelect={handleToothSelect}
                            />
                        }

                        {activeTab === "medicine" &&
                            <MedicineTab
                                examinationMedicine={examinationMedicine}
                                setShowAddMedicine={setShowAddMedicine}
                                setSelectedMedicine={setSelectedMedicine}
                                getExaminationMedicine={getExaminationMedicine}
                            />
                        }

                        {activeTab === "patientConsent" &&
                            <ConsentTab
                                patientDetails={patientDetails}
                                setPatientDetails={setPatientDetails}
                            />
                        }

                    </div>

                    {activeTab === "chart" || activeTab === "3d" ? <PenandaWarna conditions={conditions} /> : "" }

                </div>

                {activeTab === "chart" || activeTab === "3d" ?
                    <Tretment
                        toothFinding={filteredToothFinding}
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
