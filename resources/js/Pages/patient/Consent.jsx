
import MainLayout from "@/layout/MainLayout.jsx";
import React, { useEffect, useState } from "react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";
import api from "@/lib/axios.js";
import ConsentTab from "@/components/tabs/ConsentTab.jsx";
import PageTitle from "@/components/atom/PageTitle.jsx";

const Consent = () => {

    const { auth } = usePage().props;
    const id = auth?.user?.id;

    const [patientDetails, setPatientDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const getPatientById = async () => {

        try {
            setLoading(true);
            const response = await api.get(route("getPatientById", { id }));
            setPatientDetails(response.data ?? {});

        } catch (error) {
            console.error(
                "Error loading patient:",
                error.response?.data || error.message
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getPatientById();
    }, [id]);

    const isSigned = Boolean(patientDetails?.consent_sign_url);

    return (

        <MainLayout>

            <div className="w-full h-auto rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">
                <PageTitle title="Patient Consent" />
                <div className="mb-2 p-4 flex flex-col gap-3 rounded-lg">
                    {loading ? (
                        <div className="flex justify-center p-5">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <>
                            <ConsentTab
                                patientDetails={patientDetails}
                                setPatientDetails={setPatientDetails}
                                isSigned={isSigned}
                            />
                            {isSigned && (
                                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-semibold text-green-700">
                                                Patient Consent Already Signed
                                            </div>
                                            <div className="text-xs text-green-600">
                                                Consent signature verified.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Consent;
