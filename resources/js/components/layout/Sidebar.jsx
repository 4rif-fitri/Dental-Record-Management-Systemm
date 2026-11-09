
import { usePage, Link } from '@inertiajs/react';
import logo from "../../assets/UTeM Health Center Crescent Logo.png";

const back = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};

function LinkItem({ label, link, setSidebarOpen }) {
    return (
        <Link href={link}  onClick={() => setSidebarOpen(false)}
            className="flex items-center rounded-lg px-3 py-2.5 text-sm font-semibold text-[#262626] transition-colors hover:bg-[#EEEEEE]">
            {label}
        </Link>
    );
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const { auth } = usePage().props;

    const role = auth?.user?.role;

    const menuGroups = {
        patient: [
            {
                title: "Patient",
                items: [
                    { label: "Appointment List", link: "/patient-appointment" },
                    { label: "Appointment Form", link: "/patient-book-appointment" },
                    { label: "My Profile", link: "/user-profile" },
                ],
            },
        ],

        clinic_staff: [
            {
                title: "Clinic Staff",
                items: [
                    { label: "Queues List", link: "/list-queue" },
                    { label: "My Profile", link: "/user-profile" },
                ],
            },
        ],

        dentist: [
            {
                title: "Dentist",
                items: [
                    { label: "Appointments", link: "/dentist-list-appointment" },
                    { label: "Patients", link: "/dentist-list-patient" },
                    { label: "My Profile", link: "/user-profile" },
                ],
            },
        ],
    };

    const menus = menuGroups[role] || [];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col
            border-r border-[#E5E5E5] bg-[#FAFAFA]
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0`}
        >
            <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#E5E5E5] px-6">
                <div className="flex h-full w-full items-center" style={back} />

                <button
                    onClick={() => setSidebarOpen(false)}
                    className="rounded-lg p-2 text-[#737373] hover:bg-[#EEEEEE] lg:hidden"
                    aria-label="Close navigation"
                >
                    ✕
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-8">
                {menus.map((group) => (
                    <div key={group.title}>
                        <p className="border-b border-[#E5E5E5] px-3 pb-3 pt-6 text-xs font-semibold uppercase tracking-wider text-[#737373]">
                            {group.title}
                        </p>

                        <div className="pl-2">
                            {group.items.map((item) => (
                                <LinkItem
                                    key={item.link}
                                    label={item.label}
                                    link={item.link}
                                    setSidebarOpen={setSidebarOpen}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};
export default Sidebar
