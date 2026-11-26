import React from 'react'


const PenandaWarna = ({conditions}) => {

    let ColorCodeTooth = ({ className, label }) => {
      return (
          <div className="flex items-center gap-2">
              <span
                  className={`w-10 h-10 border-gray-400 border-2 rounded-3xl ${className}`}
              ></span>
              <p>{label}</p>
          </div>
      );
    }

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-5">
              {conditions.map((data, idx) =>
                  <ColorCodeTooth key={idx} label={data.condition_name} className={data.color} />
              )}
        </div>
    );
}

export default PenandaWarna
