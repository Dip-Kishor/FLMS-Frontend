"use client";
// import LoadingOverlay from "@/components/UI/LoadingSpinner";
import Loading from "@/components/UI/Loading";
import { port } from "@/constants/appl.constant";
import React, { useState } from "react";
import LoginButton from "@/components/UI/LoginButton";
import { usePopup } from "@/components/UI/Popup";
import { useFlmsPopup } from "@/components/UI/FLMS.Popup";

import axios from "axios";

const Page = () => {
  const { showPopup } = usePopup();
  const { showFlmsPopup } = useFlmsPopup();
  const [imageFile, setFile] = useState<File | null>(null);

  const [teamImageFile,setTeamFile]= useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    efootballId: "",
    inGameName: "",
  });

  const GenderEnum = {
    Male: 0,
    Female: 1,
    Other: 2,
  };

  const [loading, setLoading] = useState(false);

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };
  
  const saveTeamFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamFile(e.target.files ? e.target.files[0] : null);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name); 
      formDataToSend.append("email", formData.email); 
      formDataToSend.append("gender", formData.gender); 
      formDataToSend.append("eFootballId", formData.efootballId);
      formDataToSend.append("inGameName", formData.inGameName); 
      if (imageFile) {
        formDataToSend.append("imageFile", imageFile);
      }
      
      if (teamImageFile) {
        formDataToSend.append("teamImageFile", teamImageFile);
      }
      
      
      const response = await axios.post(`${port}/playerRegistrationApi/register`,formDataToSend, {
        withCredentials: true,
      });
  
      const data = await response.data;
  
      if (data.status == 4) {
        setLoading(false);
        showFlmsPopup(data.message, "success","/");
      } else {
        setLoading(false);
        showFlmsPopup(data.message, "warning","/");
      }
    } catch (error) {
      setLoading(false);
      showPopup("An error occurred during register...", "warning");
      console.error("Error:", error); // Log the error for debugging
    }
  };

  return (
    <>
      {loading ? <Loading /> : <></>}
      <div className="min-h-screen flex items-center justify-center bg-[#F2ECDB] bg-cover ">
        <div className="w-[1188px] bg-[url('/image4.png')] bg-no-repeat  h-[60vh]">
          <div className="w-[400px] mx-auto bg-white p-10 rounded-md">
            <div className="flex items-center justify-center">
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="user"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  required
                >
                  <option value="">Select Gender</option>
                  {Object.entries(GenderEnum).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  e-Football Id
                </label>
                <input
                  type="text"
                  name="efootballId"
                  value={formData.efootballId}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="ASBB-000-000"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  In game name
                </label>
                <input
                  type="text"
                  name="inGameName"
                  value={formData.inGameName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md  border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  placeholder="user123"
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      width="100px"
                      height="100px"
                      className="max-w-xs max-h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </div> */}
              <div className="flex gap-x-2">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 [width:95%]">
                  Player Image
                </label>
                <input
                  type="file"
                  // name="imageFile"
                  accept="image/*"
                  onChange={saveFile}
                  className="mt-1 block  p-2 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm [width:100%]"
                  required
                />
                </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Team Image
                </label>
                <input
                  type="file"
                  // name="imageFile"
                  accept="image/*"
                  onChange={saveTeamFile}
                  className="mt-1 block [width:100%] p-2 rounded-md border-2 border-gray-300 shadow-sm focus:outline-none focus:border-[#4C6F35] sm:text-sm"
                />
                </div>
                </div>
              <div className="w-full">
                <LoginButton name="Register" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
