"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import calculateAge from "@/utils/calculateAge";
const ProfilePage = () => {
  const { data: session } = useSession();

  // useState to hold user data coming from database
  const [userData, setUserData] = useState(null);
  // useEffect to fetch user data from database
  useEffect(() => {
    document.title = "Profile";
    if (!session) {
      window.location.href = "/";
      return;
    }
    // get user data from database
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "/api/me",
          {
            headers: {
              email: session.user.email
            }
          }
        );
        console.log(response.data.profile);
        setUserData(response.data.profile);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);
  return (

    <main className="flex flex-col w-full h-[90vh] max-h-dvh">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <img
            src={userData?.profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full shadow-md mb-4"
          />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">{userData?.name}</h1>
          <p className="text-gray-600">{userData?.email}</p>
        </div>

        <div className="space-y-4">
          {/* Date of Birth */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">
              Date of Birth:
            </span>
            <span className="text-gray-600">{calculateAge(userData?.dateOfBirth)}</span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Phone Number:</span>
            <span className="text-gray-600">{userData?.phone_number || "Nan"}</span>
          </div>

          {/* Hospital */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Hospital:</span>
            <span className="text-gray-600">{userData?.hospital?.name || ""}</span>
          </div>

          {/* Emergency Contact */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold mr-3">
              Emergency Contact:
            </span>
            <span className="text-gray-600">{userData?.emergency_contact || "Nan"}</span>
          </div>


          {/* Active Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Status:</span>
            <span className="text-green-500 font-semibold">{userData?.isActive ?? "True"}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Edit Profile
          </button>
        </div>
      </div>
    </main>

  );
};

export default ProfilePage;
