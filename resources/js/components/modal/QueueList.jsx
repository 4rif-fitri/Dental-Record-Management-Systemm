import React, {useEffect} from 'react'
import QueueTable from '../QueueTable';

const QueueList = ({ setShowPopup }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-base-100">
            <div className="rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex flex-wrap justify-between">
                    <h2 className="text-xl font-bold">Queue List</h2>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="btn w-30 h-8"
                    >
                        Close
                    </button>
                </div>

                <QueueTable />
            </div>
        </div>
    );
};

export default QueueList
