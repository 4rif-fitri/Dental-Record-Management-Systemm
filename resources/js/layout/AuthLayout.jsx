import logo from "../assets/UTeM Health Center Logo.png";

const back = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-[#E5E5E5]">
                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                    {children}
                </div>
                <div className="hidden lg:flex items-center justify-center p-8">
                    <div className="w-full h-full min-h-[400px]" style={back} />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout
