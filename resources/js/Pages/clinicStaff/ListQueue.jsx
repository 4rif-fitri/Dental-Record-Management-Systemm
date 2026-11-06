import React, { useState } from 'react'
import MainLayout from '../../layout/mainLayout'
import RegisterQueue from '../../components/modal/RegisterQueue';
import QueueTable from '../../components/QueueTable';

const ListQueue = () => {
  let [showPopup, setShowPopup] = useState(true);

  return (
      <MainLayout>
          {showPopup && <RegisterQueue setShowPopup={setShowPopup} />}

          <div className="w-full min-h-[350px] rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
              <div className="mb-4 flex flex-wrap justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Queue List
                  </h2>
                  <button
                      onClick={() => setShowPopup(true)}
                      className="btn w-40 text-nowrap"
                  >
                      Register Patient
                  </button>
              </div>
              <div className="space-y-3">
                  <QueueTable role={"Clinic Staff"} />
              </div>
          </div>
      </MainLayout>
  );
}

export default ListQueue
