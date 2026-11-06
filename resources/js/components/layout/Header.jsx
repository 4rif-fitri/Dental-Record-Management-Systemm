export const Header = ({ setSidebarOpen }) => {
    const Icon = ({ name, className = "h-5 w-5" }) => {
        const paths = {
            menu: <path d="M4 6h16M4 12h16M4 18h16" />,
        };

        return (
            <svg
                className={className}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                {paths[name]}
            </svg>
        );
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
                <a
                    href={route("logout")}
                    className="rounded-md border border-red-600 bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                    Logout
                </a>
            </div>
        </header>
    );
};
