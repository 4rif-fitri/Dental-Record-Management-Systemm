
import React, { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js';
import Swal from 'sweetalert2';
import api from "@/lib/axios.js";
import {usePage} from "@inertiajs/react";

const ConsentTab = ({patientDetails, setPatientDetails, isSigned}) => {
    const { auth } = usePage().props;
    const currentRole = auth?.user?.role;

    const canvasRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const consentAlreadySigned = isSigned ?? Boolean(patientDetails?.consent_sign_url);

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

            img.onerror = () => {
                console.error("Unable to load patient signature");
                setHasSignature(false);
            };

            img.src = signature;

        } else {

            ctx.clearRect(0, 0, rect.width, rect.height);
            setHasSignature(false);

        }

    }, [patientDetails?.consent_sign_url]);

    const getPosition = (event) => {

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };

    };

    const startDrawing = (event) => {

        if (consentAlreadySigned) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const position = getPosition(event);

        ctx.beginPath();
        ctx.moveTo(position.x, position.y);

        setIsDrawing(true);

        canvas.setPointerCapture?.(event.pointerId);

    };

    const draw = (event) => {

        if (!isDrawing || consentAlreadySigned) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const position = getPosition(event);

        ctx.lineTo(position.x, position.y);
        ctx.stroke();

        setHasSignature(true);

    };

    const stopDrawing = () => {

        setIsDrawing(false);

    };

    const clearSignature = () => {

        if (consentAlreadySigned) return;

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
            if (consentAlreadySigned) {
                return;
            }

            if (!patientDetails?.id) {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Patient not found.',
                });

                return;

            }

            if (!hasSignature) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Empty Signature',
                });
                return;
            }

            setIsSaving(true);

            const canvas = canvasRef.current;

            const signature = canvas.toDataURL('image/png');

            const response = await api.post(route('saveSignature', {id: patientDetails.id}),
                { signature: signature }
            );

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

    // =====================================
    // Render
    // =====================================

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
                <div className="flex justify-between items-center mb-2">
                    <label className="block font-medium">
                        Patient Signature
                    </label>

                    {consentAlreadySigned && (
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                            Already Signed
                        </span>
                    )}
                </div>

                <div className={`border-2 border-dashed rounded-lg overflow-hidden
                    ${consentAlreadySigned ? 'border-green-300' : 'border-gray-300'}`}>
                    <canvas ref={canvasRef}
                        className={`w-full h-52 bg-white ${consentAlreadySigned ? 'cursor-default' : 'cursor-crosshair touch-none'}`}
                        style={{touchAction: 'none'}}
                        onPointerDown={consentAlreadySigned ? undefined : startDrawing}
                        onPointerMove={consentAlreadySigned ? undefined : draw}
                        onPointerUp={stopDrawing}
                        onPointerLeave={stopDrawing}
                        onPointerCancel={stopDrawing}
                    />
                </div>

                {!consentAlreadySigned && currentRole !== "dentist" && (
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                            <button type="button" onClick={clearSignature}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                                Clear
                            </button>
                            <button type="button"
                                onClick={handleSaveSignature}
                                disabled={isSaving || !hasSignature}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                {isSaving ? 'Saving...' : 'Save Signature'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ConsentTab;
