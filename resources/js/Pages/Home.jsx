import React from "react";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-base-200">
            <h1 className="text-4xl font-bold text-primary">
                Laravel + React + Inertia
            </h1>

            <button className="btn btn-primary">daisyUI Button</button>

            <button className="btn btn-secondary">Secondary Button</button>

            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Hello daisyUI!</h2>

                    <p>Tailwind CSS dan daisyUI sudah dipasang.</p>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
