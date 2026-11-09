import React, {useEffect, useState} from "react";
import MainLayout from "../../layout/mainLayout";
import PatientDetails from "../../components/tabs/PatientDetailsTab";
import ConsentTab from "../../components/tabs/ConsentTab";
import NotesTab from "../../components/tabs/notesTab";
import MedicineTab from "../../components/tabs/medicineTab";
import PhotosTab from "../../components/tabs/photosTab";
import DentalChart2D from "../../components/tabs/DentalChart2D";
import PenandaWarna from "../../components/PenandaWarna";
import DentalChart3D from "../../components/tabs/DentalChart3D";
import Tretment from "../../components/tabs/Tretment";
import Medicine from "../../components/modal/Medicine";
import Photo from "../../components/modal/Photo";
import PreviewPhoto from "../../components/modal/previewPhoto";
import ToothProcedure from "../../components/modal/ToothProcedure";
import {useParams} from "react-router-dom";
import {route} from "ziggy-js";
import api from "@/lib/axios.js";
import PageTitle from "@/components/layout/PageTitle.jsx";

const Examination = () => {
    let [activeTab, setActiveTab] = useState("patient");
    let [notes, setNotes] = useState("");
    let [savedNotes, setSavedNotes] = useState("");
    let [medicines, setMedicines] = useState([]);
    let [showAddMedicine, setAddMedicine] = useState(false);
    let [photos, setPhotos] = useState([]);
    let [showAddPhoto, setAddPhoto] = useState(false);
    let [selectedPhoto, setSelectedPhoto] = useState(null);
    let [showPreviewPhoto, setShowPreviewPhoto] = useState(false);
    let [showToothProcedure, setShowToothProcedure] = useState(false);
    let [selectedTooth, setSelectedTooth] = useState(null);

    const [patientDetails, setPatientDetails] = useState([])

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

    function updateProcedureStatus(id, newStatus) {
        setProcedures((previous) =>
            previous.map((item) =>
                item.id === id ? { ...item, status: newStatus } : item,
            ),
        );
    }

    function deleteMedicine(id) {
        setMedicines((previous) => previous.filter((item) => item.id !== id));
    }

    function handleSaveNotes() {
        setSavedNotes(notes);
        alert("Note saved successfully!");
    }

    function onSelect(tooth) {
        const toothNumber =
            typeof tooth === "object"
                ? (tooth?.toothNumber ?? tooth?.tooth ?? tooth?.name ?? "")
                : tooth;

        setSelectedTooth(toothNumber);
        setShowToothProcedure(true);
    }

    function deletePhoto(id) {
        setPhotos((previous) => previous.filter((item) => item.id !== id));

        if (selectedPhoto?.id === id) {
            setSelectedPhoto(null);
            setShowPreviewPhoto(false);
        }
    }

    function openPreviewPhoto(photo) {
        setSelectedPhoto(photo);
        setShowPreviewPhoto(true);
    }

    function handleAddPhoto(files) {
        if (!files) return;

        const fileList = Array.from(files);
        fileList.forEach((file) => {
            if (!file.type.startsWith("image/")) return;

            const reader = new FileReader();
            reader.onload = () => {
                setPhotos((previous) => [
                    ...previous,
                    {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        image: reader.result,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        });
        setAddPhoto(false);
    }

    function handleAddMedicine(medicine) {
        if (!medicine?.name?.trim()) return;

        const newMedicine = {
            id: Date.now(),
            name: medicine.name,
            notes: medicine.notes,
        };

        setMedicines((previous) => [...previous, newMedicine]);
        setAddMedicine(false);
    }

    let linkTabs = [
        { text: "patient", label: "Patient Details" },
        { text: "chart", label: "Dental Chart" },
        { text: "3d", label: "3D" },
        { text: "notes", label: "Notes" },
        { text: "medicine", label: "Medicine" },
        { text: "photos", label: "Photos" },
        { text: "patientConsent", label: "Patient Consent" },
    ];

    const TabsHeader = () => {
        return (
            <div className="flex gap-2 flex-wrap items-center">
                {linkTabs.map((tab) => (
                    <button key={tab.text} onClick={() => setActiveTab(tab.text)}
                            className={`btn sm:w-50 w-[48%] ${activeTab === tab.text ? "btn-primary" : "bg-white text-black border"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
        )
    }

    const getPatientDetails = async (id) => {
        try {
            const response = await api.get(
                route('patientDetails', { id })
            );
            setPatientDetails(response.data)
            console.log(response)

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
            <Medicine showAddMedicine={showAddMedicine} setAddMedicine={setAddMedicine} onSave={handleAddMedicine}/>
            <Photo showAddPhoto={showAddPhoto} setAddPhoto={setAddPhoto} onSave={handleAddPhoto}/>
            <PreviewPhoto showPreviewPhoto={showPreviewPhoto} setShowPreviewPhoto={setShowPreviewPhoto} photo={selectedPhoto}/>
            <ToothProcedure showToothProcedure={showToothProcedure} setShowToothProcedure={setShowToothProcedure} selectedTooth={selectedTooth}/>

            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title={"Patients Examination"}/>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                   <TabsHeader />

                    <div className="w-full h-auto bg-white rounded mt-2">
                        {activeTab === "patient" && <PatientDetails patientDetails={patientDetails} />}
                        {activeTab === "chart" && (
                            <DentalChart2D onSelect={onSelect} />
                        )}
                        {activeTab === "3d" && (
                            <DentalChart3D onSelect={onSelect} />
                        )}

                        {activeTab === "photos" && (
                            <PhotosTab
                                activeTab="photos"
                                photos={photos}
                                onAddPhoto={() => setAddPhoto(true)}
                                onDeletePhoto={deletePhoto}
                                onPreviewPhoto={openPreviewPhoto}
                            />
                        )}

                        {activeTab === "medicine" && (
                            <MedicineTab
                                activeTab={activeTab}
                                medicines={medicines}
                                onAddMedicine={() => setAddMedicine(true)}
                                onDeleteMedicine={deleteMedicine}
                            />
                        )}
                        {activeTab === "notes" && (
                            <NotesTab
                                activeTab={activeTab}
                                notes={notes}
                                setNotes={setNotes}
                                savedNotes={savedNotes}
                                onSaveNotes={handleSaveNotes}
                            />
                        )}
                        {activeTab === "patientConsent" && <ConsentTab />}
                    </div>
                    {activeTab === "chart" || activeTab === "3d" ? (
                        <PenandaWarna />
                    ) : (
                        <></>
                    )}
                </div>

                {activeTab === "chart" || activeTab === "3d" ? (
                    <Tretment
                        procedures={procedures}
                        updateProcedureStatus={updateProcedureStatus}
                    />
                ) : (
                    <></>
                )}
            </div>
        </MainLayout>
    );
};

export default Examination;
