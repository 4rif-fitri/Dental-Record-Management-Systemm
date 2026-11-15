
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/mainLayout';
import RegisterQueue from '../../components/modal/RegisterQueue';
import QueueTable from '../../components/QueueTable';
import { route } from "ziggy-js";
import api from "@/lib/axios.js";

const ListQueue = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [queues, setQueues] = useState([]);

    const loadQueue = async () => {
        try {
            setIsLoading(true);

            const response = await api.get(route('getAllQueue'));

            console.log("Queue response:", response.data);

            // Actual array is inside response.data.data
            const data = response.data ?? [];

            const sortedQueue = [...data].sort(
                (a, b) =>
                    new Date(b.created_at) - new Date(a.created_at)
            );

            setQueues(sortedQueue);

        } catch (error) {
            console.error(
                "Load queue error:",
                error.response?.data || error.message
            );

            setQueues([]);

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadQueue();
    }, []);

    return (
        <MainLayout>

            {showPopup && (
                <RegisterQueue
                    setShowPopup={setShowPopup}
                    onSuccess={loadQueue}
                />
            )}

            <div className="w-full min-h-[350px] rounded-xl border border-gray-300 bg-white p-3 sm:p-4 text-black">

                <div className="mb-4 flex flex-wrap justify-between items-center gap-3">

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

                    <QueueTable
                        queues={queues}
                        role="Clinic Staff"
                        isLoading={isLoading}
                    />

                </div>

            </div>

        </MainLayout>
    );
};

export default ListQueue;
