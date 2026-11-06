import React, { useState } from 'react'
import MainLayout from '../../layout/mainLayout';
import QueueList from '../../components/modal/QueueList';
import PatientTable from '../../components/PatientList';

const ListPatient = () => {
	const [showPopup, setShowPopup] = useState(false);

  return (
      <MainLayout>
          {showPopup && <QueueList setShowPopup={setShowPopup} />}

          <div className="w-full min-h-[350px] rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
              <div className="mb-2 pb-4 flex items-center justify-between border-b-1 border-gray-300">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Patients
                  </h1>
                  <button
                      type="button"
                      onClick={() => setShowPopup(true)}
                      className=" btn btn-primary"
                  >
                      In Queues
                  </button>
              </div>

              <div className="mb-2">
                  <label className="mb-1 block text-sm text-black">
                      Ic / Passport Number / Student ID/ Staff ID
                  </label>

                  <div className="flex items-center gap-2">
                      <input
                          type="text"
                          className="h-10 min-w-0 flex-1 border border-gray-200 px-2 text-sm outline-none focus:border-blue-500"
                      />

                      <button
                          type="button"
                          className="h-9 w-25 rounded bg-black text-xs text-white hover:bg-gray-800"
                      >
                          Search
                      </button>
                  </div>
              </div>

              <PatientTable role={"Dentist"} />
          </div>
      </MainLayout>
  );
}

export default ListPatient;
