const HeaderSection = ({userProfile,setShowPopup}) => {
    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="relative h-36 overflow-hidden bg-gray-50 sm:h-44"
                 style={{
                     backgroundImage:"linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
                     backgroundSize: "36px 36px",}}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-200/30" />
                <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border border-gray-200/80" />
                <div className="absolute -right-2 -top-16 h-48 w-48 rounded-full border border-gray-200/80" />
            </div>

            <div className="relative flex flex-col gap-5 px-5 pb-6 sm:px-7 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div
                        className="relative mt-10 h-24 w-24 rounded-xl border-4 border-white bg-cover bg-center shadow-sm sm:-mt-12 sm:h-28 sm:w-28"
                        // style={{
                        //     backgroundImage: `url("${user.image}")`,
                        // }}
                    >
                        <button type="button" className="absolute bottom-0 right-0 flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-gray-950 bg-gray-950 p-1 text-white hover:border-gray-800 hover:bg-gray-800"
                                onClick={() => alert("Connect this button to your profile edit page.",)}>
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    </div>
                    <div className="pb-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl font-semibold tracking-tight text-black">
                                {userProfile ? userProfile.name : 'Loading...'}
                            </h2>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn min-h-10 rounded-lg border-gray-950 bg-gray-950 px-4 text-white hover:border-gray-800 hover:bg-gray-800"
                        onClick={() => setShowPopup(true)}>
                    <i className="fa-solid fa-pencil"></i>
                    Edit Profile
                </button>
            </div>
        </section>
    )
}
export default HeaderSection
