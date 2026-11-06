import { useState } from "react";
import "./InteractivePolygon.css";

const FiveSurface = ({ onSelect }) => {
    const [selected, setSelected] = useState(null);

    const areas = [
        {
            name: "TOP",
            points: "0,0 400,0 195,150 105,150",
        },
        {
            name: "LEFT",
            points: "0,0 150,170 0,300",
        },
        {
            name: "RIGHT",
            points: "300,0 300,300 170,150",
        },
        {
            name: "BOTTOM",
            points: "0,300 300,300 195,180 105,180",
        },
    ];

    const handleSelect = (name) => {
        setSelected(name);

        // onSelect?.({
        //     component: "ShapeOne",
        //     surface: name
        // });

        onSelect();
    };

    return (
        <div className="container">
            <svg className="shapes" viewBox="0 0 300 300">
                {areas.map((area) => (
                    <polygon
                        key={area.name}
                        className={`area ${
                            selected === area.name ? "active" : ""
                        }`}
                        points={area.points}
                        onMouseEnter={() => console.log("Hover:", area.name)}
                        onClick={() => handleSelect(area.name)}
                    />
                ))}
            </svg>

            <div className="content top-content"></div>
            <div className="content left-content"></div>
            <div className="content right-content"></div>
            <div className="content bottom-content"></div>

            <div
                className={`center ${selected === "CENTER" ? "active" : ""}`}
                onClick={() => handleSelect("CENTER")}
            ></div>
        </div>
    );
};

export default FiveSurface;
