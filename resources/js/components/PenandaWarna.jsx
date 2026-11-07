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

  let colors = [
      { label: "Lorem", color: "bg-red-300" },
      { label: "Lorem", color: "bg-orange-300" },
      { label: "Lorem", color: "bg-amber-300" },
      { label: "Lorem", color: "bg-lime-300" },
      { label: "Lorem", color: "bg-teal-300" },
      { label: "Lorem", color: "bg-indigo-300" },
      { label: "Lorem", color: "bg-pink-300" },
      { label: "Lorem", color: "bg-fuchsia-300" },
  ];

const PenandaWarna = () => {
  return (
      <div className="w-full flex flex-wrap gap-4 justify-center mt-5">
          {colors.map((color, idx) => (

              <ColorCodeTooth
                  key={idx}
                  label={color.label}
                  className={color.color}
              />

          ))}
      </div>
  );
}

export default PenandaWarna
