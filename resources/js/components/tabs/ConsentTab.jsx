import React, { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';
import Swal from 'sweetalert2';
import api from "@/lib/axios.js";

const ConsentTab = ({patientDetails,setPatientDetails}) => {

    const canvasRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000000';

        // Load existing signature
        const signature = patientDetails?.consent_sign_url;

        if (signature) {

            const img = new Image();

            img.onload = () => {

                ctx.clearRect(0, 0, rect.width, rect.height);

                ctx.drawImage(
                    img,
                    0,
                    0,
                    rect.width,
                    rect.height
                );

                setHasSignature(true);
            };

            img.src = signature;

        } else {

            ctx.clearRect(0, 0, rect.width, rect.height);
            setHasSignature(false);

        }

    }, [patientDetails?.consent_sign_url]);


    // Get mouse / touch position
    const getPosition = (event) => {

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

    };


    // Start drawing
    const startDrawing = (event) => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const position = getPosition(event);

        ctx.beginPath();
        ctx.moveTo(position.x, position.y);

        setIsDrawing(true);

        canvas.setPointerCapture?.(event.pointerId);

    };


    // Drawing
    const draw = (event) => {

        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const position = getPosition(event);

        ctx.lineTo(position.x, position.y);
        ctx.stroke();

        setHasSignature(true);

    };


    // Stop drawing
    const stopDrawing = () => {

        setIsDrawing(false);

    };


    // Clear signature
    const clearSignature = () => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();

        ctx.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

        setHasSignature(false);

    };

    const handleSaveSignature = async () => {

        try {

            if (!patientDetails?.id) {

                Swal.fire({
                    icon: 'error',
                    title: 'Patient not found',
                    text: 'Please select a patient first.',
                });

                return;
            }

            if (!hasSignature) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Empty Signature',
                    text: 'Please provide a signature before saving.',
                });

                return;
            }

            setIsSaving(true);

            const canvas = canvasRef.current;

            // Convert canvas to Base64
            const signature = canvas.toDataURL('image/png');

            // Send to Laravel
            const response = await api.post(
                route('saveSignature', {
                    id: patientDetails.id
                }),
                {
                    signature: signature
                }
            );

            // Update patient details
            setPatientDetails(prev => ({
                ...prev,
                consent_sign_url: response.data.consent_sign_url
            }));

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Patient signature saved successfully.',
            });

        } catch (error) {

            console.error(
                'Save signature error:',
                error.response?.data || error
            );

            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response?.data?.message ||
                    'Unable to save signature.',
            });

        } finally {

            setIsSaving(false);

        }

    };


    return (

        <div className="w-full">

            <div className="border rounded-lg p-4 mb-4">
                <h2 className="font-semibold mb-2">
                    Consent Statement
                </h2>
                <p className="text-sm text-gray-600 leading-6">
                    I hereby give my consent to undergo the dental
                    examination and treatment explained by the dentist.
                    I acknowledge that the procedures, possible risks
                    and benefits have been explained to me.
                </p>
            </div>


            <div>
                <label className="block font-medium mb-2">
                    Patient Signature
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-52 bg-white cursor-crosshair touch-none"
                        style={{
                            touchAction: 'none'
                        }}
                        onPointerDown={startDrawing}
                        onPointerMove={draw}
                        onPointerUp={stopDrawing}
                        onPointerLeave={stopDrawing}
                        onPointerCancel={stopDrawing}
                    />

                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                        <button type="button" onClick={clearSignature}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                            Clear
                        </button>
                        <button type="button" onClick={handleSaveSignature}
                                disabled={isSaving || !hasSignature}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg
                        hover:bg-blue-700 disabled:opacity-50">
                            {isSaving ? 'Saving...' : 'Save Signature'}
                        </button>
                    </div>
                </div>

            </div>

        </div>

    );

};

export default ConsentTab;
