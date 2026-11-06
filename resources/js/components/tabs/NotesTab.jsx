import React from 'react'

const NotesTab = ({ activeTab, notes, setNotes, savedNotes, onSaveNotes }) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl pb-3 font-semibold">Notes</h1>
                <button onClick={onSaveNotes} className="btn btn-primary w-40">
                    Save Note
                </button>
            </div>
            <textarea
                className="border border-gray-500 w-full rounded h-75"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            {savedNotes && (
                <p className="text-sm text-green-600 mt-2">Note saved.</p>
            )}
        </div>
    );
};

export default NotesTab
