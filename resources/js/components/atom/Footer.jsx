
import React from "react";
import pku from "../../assets/UTeM Health Center Crescent Logo.png";
import ftmk from "../../assets/FTMK-logo.png";
import utem from "../../assets/logo utem.png";

const back = {
    backgroundImage: `url(${pku})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};

const logo_ftmk = {
    backgroundImage: `url(${ftmk})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};

const logo_utem = {
    backgroundImage: `url(${utem})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};


export const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 px-8 md:px-16 py-10">

            <div className="max-w-7xl flex flex-wrap justify-between gap-10">

                <div>
                    <h3 className="text-base font-bold text-gray-700 mb-4">
                        Resources
                    </h3>

                    <div className="flex flex-col gap-2 text-xs text-blue-700">
                        <a href="https://www.utem.edu.my/" target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-1 hover:text-blue-900">
                            UTeM Official Website
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        </a>

                        <a href="https://pusatkesihatan.utem.edu.my/en/" className="flex items-center gap-1 hover:text-blue-900">
                            Pusat Kesihatan Utem Official Website
                            <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-bold text-gray-700 mb-4">
                        Contact Us
                    </h3>

                    <div className="text-xs text-gray-600 space-y-4">
                        <div>
                            <p className="font-medium text-gray-700 mb-1">Email:</p>
                            <a href="mailto:pusatkesihatanutem@utem.edu.my"
                               className="hover:text-blue-700">
                                pusatkesihatanutem@utem.edu.my
                            </a>
                        </div>

                        <div>
                            <p className="font-medium text-gray-700 mb-1">
                                Phone Number:
                            </p>
                            <a href="tel:pusatkesihatanutem@utem.edu.my"
                               className="hover:text-blue-700">
                                06-2292308
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-bold text-gray-700 mb-4">
                        Follow Us
                    </h3>

                    <div className="flex flex-col gap-3">

                        <div className="flex items-center gap-3">
                            <a href="#" aria-label="Facebook"
                               className="text-gray-600 hover:text-blue-700 transition">
                                <i className="fa-brands fa-facebook text-3xl"></i>
                            </a>

                            <a href="#" aria-label="Instagram"
                               className="text-gray-600 hover:text-pink-600 transition">
                                <i className="fa-brands fa-instagram text-3xl"></i>
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <a href="" aria-label="YouTube"
                               className="text-gray-600 hover:text-red-600 transition">
                                <i className="fa-brands fa-youtube text-3xl"></i>
                            </a>

                            <a href="#" aria-label="X"
                               className="text-gray-600 hover:text-black transition">
                                <i className="fa-brands fa-x-twitter text-3xl"></i>
                            </a>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-end">
                    <div className="flex justify-center lg:justify-end">
                        <div
                            style={logo_utem}
                            className="w-40 h-28"
                            role="img"
                            aria-label="UTeM Health Center Logo"
                        />
                    </div>
                    <div className="flex justify-center lg:justify-end">
                        <div
                            style={back}
                            className="w-40 h-28"
                            role="img"
                            aria-label="UTeM Health Center Logo"
                        />
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
