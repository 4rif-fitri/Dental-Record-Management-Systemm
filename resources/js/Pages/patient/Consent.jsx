import MainLayout from "@/layout/MainLayout.jsx";
import React, {useEffect, useState} from "react";
import {route} from "ziggy-js";
import {usePage} from "@inertiajs/react";
import api from "@/lib/axios.js";
import ConsentTab from "@/components/tabs/ConsentTab.jsx";
import PageTitle from "@/components/atom/PageTitle.jsx";

const consent = () => {
    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;
    const id = auth.user.id

    const [patientDetails, setPatientDetails] = useState("");

    const getPatientById = async () => {
        try {

            const response = await api.get(
                route('getPatientById', { id })
            );

            console.log(response)

            setPatientDetails(response.data ?? []);

        } catch (error) {
            console.error(
                "Error loading medicine:",
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        getPatientById()
    },[])

    return (
        <MainLayout>
            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title={"Patient Consent"}/>

                <div className="mb-2 p-4 flex flex-col gap-2 rounded-lg">
                    <ConsentTab
                        patientDetails={patientDetails}
                        setPatientDetails={setPatientDetails}
                    />
                </div>
            </div>
        </MainLayout>
    )
}
export default consent
