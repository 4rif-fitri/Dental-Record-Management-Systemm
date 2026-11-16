import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Swal from "sweetalert2";
export const Header = ({ setSidebarOpen }) => {
    const Icon = ({ name, className = "h-5 w-5" }) => {
        return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>);
    };

    const handleLogout = async () => {

        Swal.fire({
            title: "Are you sure you want to log out?",
            text: "You will need to sign in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#000000",
            confirmButtonText: "Log Out",
            cancelButtonText: "Cancel",
            reverseButtons: true

        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('logout'), {}, {
                    onSuccess: () => {

                        Swal.fire({
                            title: "Logged Out Successfully",
                            text: "You have been logged out successfully.",
                            icon: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#5b2be0"
                        });
                    }
                });
            }
        });
    };

    return (
        <header className="z-30 flex h-[76px] shrink-0 items-center justify-between border-b border-[#E5E5E5] bg-white px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="shrink-0 rounded-lg p-2 text-[#404040] hover:bg-[#F5F5F5] lg:hidden"
                    aria-label="Open navigation"
                >
                    <Icon name="menu" />
                </button>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <button  type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700">
                    Logout
                </button>
            </div>
        </header>
    );
};
