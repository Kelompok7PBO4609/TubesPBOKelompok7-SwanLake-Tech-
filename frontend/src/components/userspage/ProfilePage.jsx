import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      if (response && response.Account) {
        setProfileInfo(response.Account);
      } else {
        console.error("Profile data is missing:", response);
      }
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <div className="profile-page-container">
      <h2>Profile Information</h2>
      <p>Name: {profileInfo.username}</p>
      <p>Email: {profileInfo.email}</p>
      {profileInfo.role === "ADMIN" && (
        <button>
          <Link to={`/update-user/${profileInfo.accountID}`}>
            Update This Profile
          </Link>
        </button>
      )}
    </div>
  );
}

export default ProfilePage;
