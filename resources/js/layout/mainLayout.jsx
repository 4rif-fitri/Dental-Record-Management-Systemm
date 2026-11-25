
import { useState } from "react";
import Sidebar from "@/components/atom/Sidebar.jsx";
import { Header } from "@/components/atom/Header.jsx";
import { Footer } from "@/components/atom/Footer.jsx";

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative flex  overflow-hidden bg-white text-gray-900">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex min-w-0 flex-1 flex-col lg:pl-[280px]">

                <Header setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6">
                    {children}
                </main>

                <Footer />

            </div>
        </div>
    );
};

export default MainLayout;
