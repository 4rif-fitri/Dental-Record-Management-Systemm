import React from 'react'

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


const PenandaWarna = ({conditions}) => {

  return (
      <div className="w-full flex flex-wrap gap-4 justify-center mt-5">
          {conditions.map((data, idx) => (

              <ColorCodeTooth
                  key={data.id}
                  label={data.condition_name}
                  className={data.color}
              />

          ))}
      </div>
  );
}

export default PenandaWarna
