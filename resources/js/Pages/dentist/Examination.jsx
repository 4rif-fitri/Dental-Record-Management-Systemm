import React, { useState } from 'react'
import MainLayout from '../../layout/mainLayout'
import PatientDetails from '../../components/tabs/PatientDetailsTab';
import ConsentTab from '../../components/tabs/ConsentTab';
import NotesTab from '../../components/tabs/notesTab';
import MedicineTab from '../../components/tabs/medicineTab';
import PhotosTab from '../../components/tabs/photosTab';
import FourSurface from '../../components/tooth/FourSurface';
import FiveSurface from '../../components/tooth/FiveSurface';



const Examination = () => {
    let [activeTab, setActiveTab] = useState("patient");
    let [notes, setNotes] = useState("");
    let [savedNotes, setSavedNotes] = useState("");
    let [medicines, setMedicines] = useState([])
    let [showAddMedicine, setAddMedicine] = useState(false);
    let [photos, setPhotos] = useState([]);
    let [showAddPhoto, setAddPhoto] = useState(false);
    let [selectedPhoto, setSelectedPhoto] = useState(null);
    let [showPreviewPhoto, setShowPreviewPhoto] = useState(false);

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

    function deleteMedicine(id) {
        setMedicines((previous) => previous.filter((item) => item.id !== id));
    }

    function handleSaveNotes() {
        setSavedNotes(notes);
        alert("Note saved successfully!");
    }

    function TretmentComponent() {
        return (
            <div className="mt-10 mb-2 grid grid-cols-3 gap-3 border-gray-300 overflow-x-scroll p-2">
                <div className="border-1 border-gray-300 p-5 flex flex-col gap-2 h-150 overflow-y-scroll">
                    <h1 className="text-2xl pb-3 font-semibold">Planing</h1>
                    {procedures
                        .filter((item) => item.status === "Planning")
                        .map((item) => (
                            <BoxCondition key={item.id} procedure={item} />
                        ))}
                </div>

                <div className="border-1 border-gray-300 p-5 flex flex-col gap-2 h-150 overflow-y-scroll">
                    <h1 className="text-2xl pb-3 font-semibold">In Progress</h1>
                    {procedures
                        .filter((item) => item.status === "In Progress")
                        .map((item) => (
                            <BoxCondition key={item.id} procedure={item} />
                        ))}
                </div>

                <div className="border-1 border-gray-300 p-5 flex flex-col gap-2 h-150 overflow-y-scroll">
                    <h1 className="text-2xl pb-3 font-semibold">Completed</h1>
                    {procedures
                        .filter((item) => item.status === "Completed")
                        .map((item) => (
                            <BoxCondition key={item.id} procedure={item} />
                        ))}
                </div>
            </div>
        );
    }

  function onSelect(tooth) {
      const toothNumber =
          typeof tooth === "object"
              ? (tooth?.toothNumber ?? tooth?.tooth ?? tooth?.name ?? "")
              : tooth;

      setSelectedTooth(toothNumber);
      setShowToothProcedure(true);
  }

    function BoxCondition({ procedure }) {
        return (
            <div className="border-1 border-gray-300 p-2">
                <div className="grid grid-cols-2 grid-rows-1">
                    <div className="p-2 flex justify-center items-center">
                        {procedure.typeTooth === "Molar" ? (
                            <FiveSurface />
                        ) : (
                            <FourSurface />
                        )}
                    </div>

                    <div className="p-2">
                        <div className=" mb-2">
                            <h1>Tooth:</h1>
                            <p className="font-semibold border border-gray-400 p-2 rounded-2">
                                {procedure.tooth}
                            </p>
                        </div>

                        <div className=" mb-2">
                            <h1>Condition:</h1>
                            <p className="font-semibold border border-gray-400 p-2 rounded-2">
                                {procedure.condition}
                            </p>
                        </div>
                        <div className="mb-2">
                            <h1>Treatment:</h1>
                            <p className="font-semibold border border-gray-400 p-2 rounded-2">
                                {procedure.treatment}
                            </p>
                        </div>
                        <div className="">
                            <button
                                className="w-full btn-soft btn-primary border p-1.5 rounded cursor-pointer"
                                onClick={onSelect}
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>

                {procedure.status === "Planning" && (
                    <div className=" grid grid-cols-2 gap-2 p-1">
                        <div></div>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                updateProcedureStatus(
                                    procedure.id,
                                    "In Progress",
                                )
                            }
                        >
                            In Progress
                        </button>
                    </div>
                )}

                {procedure.status === "In Progress" && (
                    <div className=" grid grid-cols-2 gap-2 p-1">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                updateProcedureStatus(procedure.id, "Planning")
                            }
                        >
                            Planning
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                updateProcedureStatus(procedure.id, "Completed")
                            }
                        >
                            Completed
                        </button>
                    </div>
                )}

                {procedure.status === "Completed" && (
                    <div className=" grid grid-cols-2 gap-2 p-1">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                updateProcedureStatus(
                                    procedure.id,
                                    "In Progress",
                                )
                            }
                        >
                            In Progress
                        </button>

                        <div></div>
                    </div>
                )}
            </div>
        );
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

    return (
        <MainLayout>
            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <div className="mb-4 flex gap-2 border-gray-300 justify-between">
                    <h1 className="font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Patients Examination
                    </h1>
                </div>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                    <div className="flex gap-2 flex-wrap items-center">
                        <button
                            onClick={() => setActiveTab("patient")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "patient" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Patient Details
                        </button>
                        <button
                            onClick={() => setActiveTab("chart")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "chart" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Dental Chart
                        </button>
                        <button
                            onClick={() => setActiveTab("3d")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "3d" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            3D
                        </button>
                        <button
                            onClick={() => setActiveTab("notes")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "notes" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Notes
                        </button>
                        <button
                            onClick={() => setActiveTab("medicine")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "medicine" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Medicine
                        </button>
                        <button
                            onClick={() => setActiveTab("photos")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "photos" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Photos
                        </button>
                        <button
                            onClick={() => setActiveTab("patientConsent")}
                            className={`btn sm:w-50 w-[48%] ${activeTab === "patientConsent" ? "btn-primary" : "bg-white text-black border"}`}
                        >
                            Patient Consent
                        </button>
                    </div>
                    <div className="w-full h-auto bg-white rounded mt-2">
                        {activeTab === "patient" &&
                            <PatientDetails />
                        }
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
                        {activeTab === "patientConsent" &&
                            <ConsentTab />
                        }
                    </div>
                </div>

                {activeTab === "chart" || activeTab === "3d" ? (
                    <TretmentComponent />
                ) : (
                    <></>
                )}
            </div>
        </MainLayout>
    );
}

export default Examination
