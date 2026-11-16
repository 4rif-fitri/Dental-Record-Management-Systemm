
import React, { useEffect, useState } from 'react';
import QueueTable from '../molecules/Queue/QueueTable.jsx';
import PageTitle from "@/components/atom/PageTitle.jsx";
import api from "@/lib/axios.js";
import { route } from "ziggy-js";
import Swal from "sweetalert2";

const QueueListModal = ({ setShowPopup, role }) => {

    const [queues, setQueues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [callingId, setCallingId] = useState(null);

    // Load today's queue
    const loadQueue = async () => {
        try {

            setIsLoading(true);

            const response = await api.get(
                route('getAllQueue')
            );

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

        } finally {

            setIsLoading(false);

        }

    };

    const handleCallQueue = async (id) => {

        try {

            setCallingId(id);

            const response = await api.put(
                route('callQueue', { id })
            );

            const updatedQueue = response.data;

            // Update queue state without refreshing page
            setQueues(prev =>
                prev.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            status: updatedQueue.status
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Call queue error:",
                error.response?.data || error.message
            );

        } finally {
            setCallingId(null);
        }

    };

    useEffect(() => {
        loadQueue();
    }, []);


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">

            <div className="rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-4 flex flex-wrap justify-between">

                    <PageTitle title={"Queue List"} />

                    <button
                        onClick={() => setShowPopup(false)}
                        className="btn btn-neutral"
                    >
                        Close
                    </button>

                </div>

                <QueueTable
                    queues={queues}
                    role={role}
                    isLoading={isLoading}
                    callingId={callingId}
                    onCallQueue={handleCallQueue}
                />

            </div>

        </div>

    );

};

export default QueueListModal;
