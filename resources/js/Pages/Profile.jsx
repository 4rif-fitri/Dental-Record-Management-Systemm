import React, {useEffect,useState} from 'react'
import MainLayout from '../layout/mainLayout'
import UpdateProfileModal from '../components/modal/UpdateProfileModal.jsx';
import ProfileDataSection from "@/components/molecules/Profile/DataSection.jsx";
import HeaderSection from "@/components/molecules/Profile/HeaderSection.jsx";
import { route } from 'ziggy-js';
import api from '@/lib/axios';

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

            <div className="min-h-screen text-gray-900">
                <div className="min-h-screen w-full">
                    <main className="mx-auto w-full px-4 py-6">

                        {/*<HeaderSection userProfile={userProfile} setShowPopup={setShowPopup}/>*/}

                        <div className={"flex justify-end"}>
                            <button type="button"
                                    className="btn min-h-10 rounded-lg border-gray-950 bg-gray-950 px-4 text-white hover:border-gray-800 hover:bg-gray-800"
                                    onClick={() => setShowPopup(true)}>
                                <i className="fa-solid fa-pencil"></i>
                                Edit Profile
                            </button>
                        </div>

                        <ProfileDataSection userProfile={userProfile} />

                    </main>
                </div>
            </div>
        </MainLayout>
    );
}

export default Profile
