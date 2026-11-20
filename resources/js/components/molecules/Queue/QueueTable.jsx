
import React from 'react';
import {Link, usePage} from "@inertiajs/react";

const QueueTable = ({
    queues = [], role, isLoading, callingId, onCallQueue
}) => {
    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;

    const getStatusBadge = (status) => {
        switch (status) {
            case "Waiting":
                return "badge-warning";
            case "Called":
                return "badge-success";
            case "Completed":
                return "badge-info";
            case "Cancelled":
                return "badge-error";
            default:
                return "badge-neutral";
        }
    };

    return (

        <div className="space-y-3">
            <div className="overflow-x-auto text-base-200">
                <table className="table">
                    <thead className="text-black">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>IC/Passport Number</th>
                        <th>Create At</th>
                        <th>Status</th>
                        {currentRole === "dentist" && <th>Action</th>}
                    </tr>

                    </thead>
                        <tbody className="text-black">

                    {isLoading ? (

                        <tr>
                            <td
                                colSpan={currentRole !== "Clinic Staff" ? 6 : 5}
                                className="text-center py-8"
                            >
                                Loading queue...
                            </td>
                        </tr>

                    ) : queues.length === 0 ? (

                        <tr>
                            <td
                                colSpan={role !== "clinicStaff" ? 6 : 5}
                                className="text-center py-8"
                            >
                                No queue available today.
                            </td>
                        </tr>

                    ) : (

                        queues.map((queue) => (

                            <tr key={queue.id}>

                                <th>
                                    {queue.id}
                                </th>

                                <td>
                                    {queue.patient?.name || "-"}
                                </td>

                                <td>
                                    {queue.patient?.ic_passport || "-"}
                                </td>

                                <td>
                                    {queue.created_at
                                        ? new Date(queue.created_at).toLocaleTimeString(
                                            "en-MY",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true
                                            }
                                        )
                                        : "-"}
                                </td>

                                <td>

                                    <div className={`badge w-full ${getStatusBadge(queue.status)}`}>
                                        {queue.status}
                                    </div>

                                </td>


                                <td className="flex gap-2">
                                    {currentRole === "dentist" && (
                                        <>
                                            {queue.status === "waiting" && (
                                                <button
                                                    onClick={() => onCallQueue(queue.id)}
                                                    className="btn btn-primary font-semibold h-7"
                                                >
                                                    Call
                                                </button>
                                            )}

                                            <Link
                                                href={`/dentist-examination/${queue.patient_id}`}
                                                className="btn btn-primary font-semibold h-7"
                                            >
                                                View
                                            </Link>
                                        </>
                                    )}
                                </td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default QueueTable;
