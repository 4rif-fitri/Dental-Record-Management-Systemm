import React, {useEffect,useState} from 'react'
import MainLayout from '../layout/mainLayout'
import UpdateProfileModal from '../components/modal/UpdateProfileModal.jsx';
import ProfileDataSection from "@/components/molecules/Profile/DataSection.jsx";
import { route } from 'ziggy-js';
import api from '@/lib/axios';
import Footer from "@/components/atom/Footer.jsx";

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
            {showPopup && <UpdateProfileModal setShowPopup={setShowPopup} userProfile={{userProfile}} onUpdated={getProfileData}/>}

            <div className="text-gray-900">
                <div className="w-full">
                    <main className="mx-auto w-full">

                        <ProfileDataSection userProfile={userProfile} setShowPopup={setShowPopup} />

                    </main>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile
