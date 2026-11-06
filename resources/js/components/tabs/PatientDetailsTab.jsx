import React from 'react'

const PatientDetails = () => {
    function PatientInfoLabel({ label, value }) {
        return (
            <div className="flex flex-wrap gap-2">
                <h1 className=" text-xl">{label}:</h1>
                <p className=" text-xl">{value}</p>
            </div>
        );
    }

    return (
      <div className="mb-2 p-4 flex flex-col flex-wrap gap-2">
          <h1 className="font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Patient Details
          </h1>

          <div className=" grid grid-cols-3">
              <div className="flex flex-col gap-2">
                  <PatientInfoLabel label={"Name"} value={"Lorem"} />
                  <PatientInfoLabel
                      label={"Ic/Passport"}
                      value={"1032654789"}
                  />
                  <PatientInfoLabel label={"Gender"} value={"Male"} />
              </div>

              <div className="flex flex-col gap-2">
                  <PatientInfoLabel label={"Phone No"} value={"1032654789"} />
                  <PatientInfoLabel label={"Email"} value={"email@gmail.com"} />
                  <PatientInfoLabel
                      label={"Student/Staff id"}
                      value={"D032410335"}
                  />
              </div>
          </div>
      </div>
    );
}

export default PatientDetails
