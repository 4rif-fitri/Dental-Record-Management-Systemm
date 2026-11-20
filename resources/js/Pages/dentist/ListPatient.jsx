import React, {useEffect, useState} from 'react'
import MainLayout from '../../layout/mainLayout';
import QueueListModal from '../../components/modal/QueueListModal.jsx';
import PatientTable from '../../components/molecules/Patient/PatientList.jsx';
import {route} from "ziggy-js";
import api from '@/lib/axios';

const ListPatient = () => {
	const [showPopup, setShowPopup] = useState(false);
    const [patients, setPatients] = useState([]);
    const [search,setSearch] = useState("");

    const handleSearch = async () => {
        try {
            const response = await api.post('/patient/search', {
                keyword: search
            });

            setPatients(response.data)

            console.log(response.data);

        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const getAllPatient = async () => {
        try {
            const response = await api.get(route('getAllPatient'));
            setPatients(response.data)
        }catch (error){
            console.log(error)
        }

    }

    useEffect(() => {
        getAllPatient()
    },[])

  return (
      <MainLayout>
          {showPopup && <QueueListModal setShowPopup={setShowPopup} />}

          <div className="w-full min-h-87.5 rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">

              <div className="mb-2 pb-4 flex items-center justify-between border-gray-300">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Patients
                  </h1>
                  <button type="button" onClick={() => setShowPopup(true)} className=" btn btn-primary">
                      In Queues
                  </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
                  <div className="relative w-full">
                      <input type="text" placeholder="Ic / Passport Number / Student ID/ Staff ID" value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  <div className="flex items-center gap-2">
                      <button onClick={handleSearch} type="button" className="h-9 w-25 rounded bg-black text-xs text-white hover:bg-gray-800">
                          Search
                      </button>
                  </div>
              </div>

              <PatientTable role={"Dentist"} datas={patients} />
          </div>
      </MainLayout>
  );
}

export default ListPatient;
