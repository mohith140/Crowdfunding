import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import './CSS/Profile.css'; // Import custom CSS for profile styling

function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        // Assuming user data is already fetched and available in context
        if (user) {
            setProfile(user);
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={profile.profilePicture || 'https://source.unsplash.com/100x100/?person'}
                            alt="Profile"
                            className="profile-picture"
                        />
                        <h2>{profile.username}</h2>
                    </div>
                    <div className="profile-body">
                        <div className="profile-details">
                            <h4>Personal Information</h4>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Phone:</strong> {profile.mobileNumber}</p>
                        </div>
                        {/* <div className="profile-address">
                            <h4>Address</h4>
                            <p>{profile.address}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
