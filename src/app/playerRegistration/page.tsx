"use client";
import LoadingOverlay from "@/components/UI/LoadingSpinner";
import { port } from "@/constants/appl.constant";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginButton from "@/components/UI/LoginButton";
import Logo from "@/components/UI/Logo";
import { usePopup } from "@/components/UI/Popup";
import axios from "axios";

const Page = () => {
  const { showPopup } = usePopup();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    efootballId: "",
    inGameName: "",
    imageUrl: "", // This will store the file object for the image
  });

  const GenderEnum = {
    0: "Male",
    1: "Female",
    2: "Other"
  };

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Update the type here


  const router = useRouter();

  const handleChange = (e: any) => {
    if (e.target.name === "imageUrl") {
      const file = e.target.files[0]; // Get the first file selected by the user
      setFormData({ ...formData, imageUrl: file });

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("efootballId", formData.efootballId);
      formDataToSend.append("inGameName", formData.inGameName);
      if (formData.imageUrl) {
        formDataToSend.append("imageUrl", formData.imageUrl); // Append image file
      }
      console.log(formDataToSend)

      const response = await axios.post(`${port}/playerRegistrationApi/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const data = await response.data;

      if (data.status == 4) {
        setLoading(false);
        showPopup(data.message, "success");
        // router.push("/Auth/login");
      } else {
        setLoading(false);
        showPopup(data.message, "warning");
      }
    } catch (error) {
      setLoading(false);
      showPopup("An error occurred during register.", "warning");
    }
  };

  return (
    <>
      {loading ? <LoadingOverlay /> : <></>}
      <div className="min-h-screen flex items-center justify-center bg-[#dbe9e2] bg-cover ">
        <div className="w-[1188px] bg-[url('/image4.png')] bg-no-repeat  h-[60vh]">
          <div className="w-[400px] mx-auto bg-white p-10 rounded-md">
            <div className="flex items-center justify-center">
              {/* <Logo /> */}
            </div>
            <form onSubmit={handleSubmit}>
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
                      {value}
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="imageUrl"
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
