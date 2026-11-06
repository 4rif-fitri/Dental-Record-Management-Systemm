import React from 'react'
import FiveSurface from '../tooth/FiveSurface';
import FourSurface from '../tooth/FourSurface';

 const DentalChart2D = ({ onSelect }) => {

    return (
        <div className=" h-full grid
            grid-cols-[repeat(19,minmax(0,1fr))]
            grid-rows-[repeat(7,minmax(0,1fr))] gap-0">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <span></span>
            <span></span>
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <span></span>
            <span></span>

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <span></span>
            <span></span>
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <span></span>
            <span></span>

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FourSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <FiveSurface onSelect={onSelect} />
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default DentalChart2D
