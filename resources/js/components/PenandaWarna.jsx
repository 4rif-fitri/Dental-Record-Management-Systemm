import React from 'react'

  function ColorCodeTooth({ className, label }) {
      return (
          <div className="flex items-center gap-2">
              <span
                  className={`w-10 h-10 border-gray-400 border-2 rounded-3xl ${className}`}
              ></span>
              <p>{label}</p>
          </div>
      );
  }

const PenandaWarna = () => {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center mt-5">
        <ColorCodeTooth label={"lorem"} className={"bg-red-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-orange-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-amber-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-lime-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-teal-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-indigo-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-pink-300"} />
        <ColorCodeTooth label={"lorem"} className={"bg-fuchsia-300"} />
    </div>
  );
}

export default PenandaWarna
