import React, {useEffect} from 'react'
import MainLayout from '../layout/mainLayout'
import { useState } from 'react';
import UpdateProfile from '../components/modal/UpdateProfile';
import { route } from 'ziggy-js';
import api from '@/lib/axios';
import ProfileDataSection from "@/components/molecules/Profile/DataSection.jsx";
import HeaderSection from "@/components/molecules/Profile/HeaderSection.jsx";

const Profile = () => {
    const [userProfile,setUserProfile] = useState([])

    const getProfileData = async () => {
        try {
            const response = await api.get(route('getProfileData'));
            setUserProfile(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfileData()
    },[])

    const [showPopup, setShowPopup] = useState(false);

    return (
        <MainLayout>
            {showPopup && <UpdateProfile setShowPopup={setShowPopup} userProfile={{userProfile}} onUpdated={getProfileData}/>}

            <div className="min-h-screen text-gray-900">
                <div className="min-h-screen w-full">
                    <main className="mx-auto w-full px-4 py-6">

                        <HeaderSection userProfile={userProfile} setShowPopup={setShowPopup}/>

                        <ProfileDataSection userProfile={userProfile} />

                    </main>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile
