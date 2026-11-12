const TabsHeader = ({setActiveTab, linkTabs, activeTab}) => {
    return (
        <div className="flex gap-2 flex-wrap items-center">
            {linkTabs.map((tab) => (
                <button key={tab.text} onClick={() => setActiveTab(tab.text)}
                        className={`btn sm:w-50 w-[48%] ${activeTab === tab.text ? "btn-primary" : "bg-white text-black border"}`}>
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

export default TabsHeader
