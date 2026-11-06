import React, { useRef, useState, useEffect } from "react";

const ConsentTab = () => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);

    const [hasSignature, setHasSignature] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        ctx.scale(ratio, ratio);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();

        isDrawing.current = true;

        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);

        canvas.setPointerCapture(e.pointerId);
    };

    const draw = (e) => {
        if (!isDrawing.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();

        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();

        setHasSignature(true);
    };

    const stopDrawing = () => {
        isDrawing.current = false;
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    const saveSignature = () => {
        if (!hasSignature) {
            alert("Please provide patient signature.");
            return;
        }

        const signature = canvasRef.current.toDataURL("image/png");

        console.log({
            signature,
            signedAt: new Date().toISOString(),
        });
    };

    return (
        <div className="w-full h-full p-2">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl pb-3 font-semibold">Patient Consent</h1>
            </div>

            <div className="text-lg leading-relaxed mb-10 space-y-4">
                <p>
                    I acknowledge that the dentist has explained the purpose of
                    the dental examination or proposed treatment, including its
                    potential benefits, risks, and available alternatives.
                </p>

                <p>
                    I understand that I may ask questions about my dental
                    condition and treatment options before giving my consent.
                </p>
            </div>

            <div className="w-full flex flex-col items-center">
                <label className="block text-xl font-medium mb-2">
                    Patient Signature
                </label>

                <canvas
                    ref={canvasRef}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerCancel={stopDrawing}
                    onPointerLeave={stopDrawing}
                    className="w-full h-[250px] border-2 border-black rounded-xl cursor-crosshair touch-none bg-white"
                />

                <div className="flex justify-end gap-3 mt-5 w-full">
                    <button
                        type="button"
                        onClick={clearSignature}
                        className="btn btn-error w-32"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={saveSignature}
                        className="btn btn-primary w-40"
                    >
                        Save Consent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentTab;
