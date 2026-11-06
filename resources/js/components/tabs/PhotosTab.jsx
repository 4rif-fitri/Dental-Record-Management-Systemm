import React from 'react'

const PhotosTab = ({
    activeTab,
    photos,
    onAddPhoto,
    onDeletePhoto,
    onPreviewPhoto,
}) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <h1 className="text-2xl pb-3 font-semibold">Photos</h1>
                <button onClick={onAddPhoto} className="btn btn-primary w-40">
                    Add Photo
                </button>
            </div>
            <div className="border p-5 h-auto border-gray-500 flex w-full gap-2 rounded h-40 flex-wrap">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="w-30 h-30 bg-gray-300 rounded relative overflow-hidden cursor-pointer"
                        onClick={() => onPreviewPhoto(photo)}
                    >
                        <img
                            src={photo.image}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                        />
                        <button
                            className="absolute top-1 right-1 bg-white rounded px-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeletePhoto(photo.id);
                            }}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosTab;
