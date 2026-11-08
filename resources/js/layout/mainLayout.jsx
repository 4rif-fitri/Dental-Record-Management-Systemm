import Sidebar from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { useState } from "react";
import {Footer} from "../components/layout/Footer";

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative h-screen overflow-hidden bg-white text-white">
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

            <div className="flex h-screen min-w-0 flex-col lg:pl-[280px]">
                <Header setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 overflow-y-auto p-6">{children}</main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
