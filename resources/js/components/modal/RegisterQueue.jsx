
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { route } from 'ziggy-js';
import api from '@/lib/axios.js';

const RegisterQueue = ({ setShowPopup, onSuccess }) => {

    const [keyword, setKeyword] = useState('');
    const [patient, setPatient] = useState(null);

    const [isSearching, setIsSearching] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [searched, setSearched] = useState(false);

    // Search Patient

    const handleSearch = async () => {

        if (!keyword.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Input Required',
                text: 'Please enter patient information.'
            });
            return;
        }

        try {

            setIsSearching(true);
            setPatient(null);
            setSearched(false);

            const response = await api.get(route('getQueuePatientSearch'), {
                params: {
                    keyword: keyword.trim()
                }
            });

            console.log("Search response:", response.data);

            const foundPatient = response.data;

            if (foundPatient) {
                setPatient(foundPatient);
            } else {
                setPatient(null);
            }

            setSearched(true);

        } catch (error) {

            console.error(
                "Search patient error:",
                error.response?.data || error.message
            );

            Swal.fire({
                icon: 'error',
                title: 'Search Error',
                text: 'Unable to search patient.'
            });

        } finally {
            setIsSearching(false);
        }
    };


    // Register Patient to Queue
    const handleRegister = async () => {

        if (!patient) return;

        const result = await Swal.fire({
            title: 'Register Patient?',
            text: `Do you want to register ${patient.name} to the queue?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Register',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#6b7280'
        });

        if (!result.isConfirmed) return;

        try {

            setIsRegistering(true);

            const response = await api.post(route('createQueue'), {
                patient_id: patient.id
            });

            console.log('Create Queue:', response.data);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Patient successfully registered to queue.',
                confirmButtonColor: '#16a34a'
            });

            // Refresh parent queue list
            if (onSuccess) {
                await onSuccess();
            }

            setShowPopup(false);

        } catch (error) {

            console.error(
                'Register queue error:',
                error.response?.data || error.message
            );

            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message ||
                    'Unable to register patient to queue.'
            });

        } finally {
            setIsRegistering(false);
        }
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">

            <div className="w-[95vw] sm:w-[80vw] lg:w-[50vw] rounded-xl bg-white p-4 shadow-xl sm:p-6">

                {/* Header */}
                <div className="mb-4 flex flex-wrap justify-between items-center">

                    <h2 className="text-xl font-bold text-black">
                        Register Patient to Queue
                    </h2>

                    <button
                        onClick={() => setShowPopup(false)}
                        className="btn w-30 h-8"
                        disabled={isRegistering}
                    >
                        Close
                    </button>

                </div>

                {/* Search Patient */}
                <div className="mb-2">

                    <label className="mb-1 block text-sm text-black">
                        IC / Passport Number / Student ID / Staff ID
                    </label>

                    <div className="flex items-center gap-2">

                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                            placeholder="Enter patient information..."
                            className="h-10 min-w-0 flex-1 rounded border border-gray-200 px-2 text-sm text-black outline-none focus:border-blue-500"
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="h-9 w-25 rounded bg-black text-xs text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>

                    </div>

                </div>

                {/* Search Result */}
                {searched && !patient && (

                    <div className="border border-gray-300 p-5 mt-4 flex justify-center">

                        <h1 className="text-red-500">
                            No Patient Found
                        </h1>

                    </div>

                )}

                {/* Patient Details */}
                {patient && (

                    <div className="border border-gray-300 rounded-lg p-4 mt-4">

                        <h1 className="font-semibold text-black mb-3">
                            Patient Detail
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Name
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {patient.name || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    IC / Passport Number
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {patient.ic_passport || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Student / Staff ID
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {patient.student_staff_id || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone Number
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {patient.phone_number || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-semibold text-gray-800">
                                    {patient.email || '-'}
                                </p>
                            </div>

                        </div>

                        <div className="flex justify-end mt-5">

                            <button
                                onClick={handleRegister}
                                disabled={isRegistering}
                                className="btn btn-primary min-w-32"
                            >
                                {isRegistering ? 'Registering...' : 'Register'}
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default RegisterQueue;
