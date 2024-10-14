"use client";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaEdit,
  FaSignOutAlt,
  FaUsers,
  FaHome,
  FaCertificate,
  FaTools,
} from "react-icons/fa";

const ProfileSection = ({ title, icon: Icon, children, fullWidth = false }) => {
  return (
    <div
      className={`mb-8 bg-white rounded-lg shadow-md p-6 ${
        fullWidth ? "col-span-1 md:col-span-2" : ""
      }`}
    >
      <h3 className="text-2xl font-semibold mb-4 flex items-center text-blue-600">
        <Icon className="mr-3" /> {title}
      </h3>
      <div className="pl-6">{children}</div>
    </div>
  );
};
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);
const ProfilePage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7207/api/Profile/me", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJzdHJpbmciLCJqdGkiOiJjODU3MWIxZC0zMmE0LTQ2YjYtOWFmMC0zOWQyZDdjZWM1YzYiLCJuYmYiOjE3Mjg4ODU1NDUsImV4cCI6MTcyODg4OTE0NSwiaWF0IjoxNzI4ODg1NTQ1LCJpc3MiOiJGVUJNT1NTaG9wIiwiYXVkIjoiRlVCTU9TQWN0b3JzIn0.KfYOeA_HQR3-4XXLP-EhxH5FwLwH3mr96IBXb7Dy-fc`,
        },
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(JSON.parse(JSON.stringify(profile)));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("https://localhost:7207/api/Profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5hbWUiOiJzdHJpbmciLCJqdGkiOiJjODU3MWIxZC0zMmE0LTQ2YjYtOWFmMC0zOWQyZDdjZWM1YzYiLCJuYmYiOjE3Mjg4ODU1NDUsImV4cCI6MTcyODg4OTE0NSwiaWF0IjoxNzI4ODg1NTQ1LCJpc3MiOiJGVUJNT1NTaG9wIiwiYXVkIjoiRlVCTU9TQWN0b3JzIn0.KfYOeA_HQR3-4XXLP-EhxH5FwLwH3mr96IBXb7Dy-fc`,
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => {
      const newProfile = { ...prevProfile };
      if (section) {
        if (index !== undefined) {
          newProfile[section][index][name] = value;
        } else {
          newProfile[section][name] = value;
        }
      } else {
        newProfile[name] = value;
      }
      return newProfile;
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddItem = (section) => {
    setEditedProfile((prevProfile) => {
      const newItem = createNewItem(section);
      return {
        ...prevProfile,
        [section]: [...prevProfile[section], newItem],
      };
    });
  };

  const handleRemoveItem = (section, index) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [section]: prevProfile[section].filter((_, i) => i !== index),
    }));
  };

  const createNewItem = (section) => {
    switch (section) {
      case "certificates":
        return { link: "" };
      case "educations":
        return { schoolName: "", yearStart: "", timespan: "", description: "" };
      case "experiences":
        return {
          jobTitle: "",
          companyName: "",
          yearStart: "",
          timespan: "",
          timespanUnitName: "",
          description: "",
        };
      case "skills":
        return {
          skillCategoryId: "",
          skillLevel: "",
          timespan: "",
          description: "",
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
              alt="JobNetwork Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-blue-600">JobNetwork</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaBriefcase className="mr-2" /> Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaUsers className="mr-2" /> Network
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="inline-block mr-2" />
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editedProfile.account.fullName}
                    onChange={(e) => handleChange(e, "account")}
                    className="text-3xl font-bold text-blue-600 mb-4 sm:mb-0 border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-blue-600 mb-4 sm:mb-0">
                    {profile?.account?.fullName}
                  </h2>
                )}
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    <FaEdit className="inline-block mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileSection title="Account" icon={FaUser}>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  disabled
                  value={editedProfile.account.email}
                  onChange={(e) => handleChange(e, "account")}
                  className="w-full p-2 mb-2 border rounded"
                />
              ) : (
                <p className="text-lg">
                  <FaEnvelope className="inline-block mr-2 text-blue-500" />
                  {profile?.account?.email}
                </p>
              )}
            </ProfileSection>

            <ProfileSection title="Certificates" icon={FaCertificate}>
              {(isEditing ? editedProfile : profile)?.certificates?.map(
                (cert, index) => (
                  <div key={index} className="mb-3">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="link"
                          value={cert.link}
                          onChange={(e) =>
                            handleChange(e, "certificates", index)
                          }
                          className="w-full p-2 mb-2 border rounded"
                        />
                        <button
                          onClick={() =>
                            handleRemoveItem("certificates", index)
                          }
                          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <p className="text-lg">
                        Certificate {index + 1}:{" "}
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {cert.link}
                        </a>
                      </p>
                    )}
                  </div>
                )
              )}
              {isEditing && (
                <button
                  onClick={() => handleAddItem("certificates")}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Certificate
                </button>
              )}
            </ProfileSection>

            <ProfileSection title="Education" icon={FaGraduationCap}>
              {(isEditing ? editedProfile : profile)?.educations?.map(
                (edu, index) => (
                  <div key={index} className="mb-4">
                    {isEditing ? (
                      <>
                        <div className="flex flex-wrap -mx-2">
                          <input
                            type="text"
                            name="schoolName"
                            value={edu.schoolName}
                            onChange={(e) =>
                              handleChange(e, "educations", index)
                            }
                            className="flex-1 p-2 m-2 border rounded"
                            placeholder="School Name"
                          />
                          <input
                            type="number"
                            name="yearStart"
                            value={edu.yearStart}
                            onChange={(e) =>
                              handleChange(e, "educations", index)
                            }
                            className="w-32 p-2 m-2 border rounded"
                            placeholder="Start Year"
                          />
                          <input
                            type="number"
                            name="timespan"
                            value={edu.timespan}
                            onChange={(e) =>
                              handleChange(e, "educations", index)
                            }
                            className="w-32 p-2 m-2 border rounded"
                            placeholder="Duration"
                          />
                          <input
                            type="text"
                            name="description"
                            value={edu.description}
                            onChange={(e) =>
                              handleChange(e, "educations", index)
                            }
                            className="flex-1 p-2 m-2 border rounded"
                            placeholder="Description"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem("educations", index)}
                          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-semibold">
                          {edu.schoolName}
                        </p>
                        <p className="text-gray-600">
                          {edu.yearStart} - {edu.yearStart + edu.timespan}
                        </p>
                        <p className="mt-2">{edu.description}</p>
                      </>
                    )}
                  </div>
                )
              )}
              {isEditing && (
                <button
                  onClick={() => handleAddItem("educations")}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Education
                </button>
              )}
            </ProfileSection>

            <ProfileSection title="Experience" icon={FaBriefcase}>
              {(isEditing ? editedProfile : profile)?.experiences?.map(
                (exp, index) => (
                  <div key={index} className="mb-4">
                    {isEditing ? (
                      <>
                        <div className="flex flex-wrap -mx-2">
                          <input
                            type="text"
                            name="jobTitle"
                            value={exp.jobTitle}
                            onChange={(e) =>
                              handleChange(e, "experiences", index)
                            }
                            className="flex-1 p-2 m-2 border rounded"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            name="companyName"
                            value={exp.companyName}
                            onChange={(e) =>
                              handleChange(e, "experiences", index)
                            }
                            className="flex-1 p-2 m-2 border rounded"
                            placeholder="Company Name"
                          />
                          <input
                            type="number"
                            name="yearStart"
                            value={exp.yearStart}
                            onChange={(e) =>
                              handleChange(e, "experiences", index)
                            }
                            className="w-24 p-2 m-2 border rounded"
                            placeholder="Start Year"
                          />
                          <input
                            type="number"
                            name="timespan"
                            value={exp.timespan}
                            onChange={(e) =>
                              handleChange(e, "experiences", index)
                            }
                            className="w-24 p-2 m-2 border rounded"
                            placeholder="Duration"
                          />
                          <input
                            type="text"
                            name="timespanUnitName"
                            value={exp.timespanUnitName}
                            onChange={(e) =>
                              handleChange(e, "experiences", index)
                            }
                            className="w-24 p-2 m-2 border rounded"
                            placeholder="Unit"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem("experiences", index)}
                          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-xl font-semibold">{exp.jobTitle}</p>
                        <p className="text-gray-600">{exp.companyName}</p>
                        <p className="text-sm text-gray-500">
                          {exp.yearStart} - {exp.yearStart + exp.timespan} (
                          {exp.timespan} {exp.timespanUnitName})
                        </p>
                        <p className="mt-2">{exp.description}</p>
                      </>
                    )}
                  </div>
                )
              )}
              {isEditing && (
                <button
                  onClick={() => handleAddItem("experiences")}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Experience
                </button>
              )}
            </ProfileSection>

            <ProfileSection title="Skills" icon={FaTools} fullWidth={true}>
              <div className="grid grid-cols-1 gap-4">
                {(isEditing ? editedProfile : profile)?.skills.map(
                  (skill, index) => (
                    <div key={index} className="p-4">
                      {isEditing ? (
                        <>
                          <div className="flex flex-wrap -mx-2">
                            <input
                              type="number"
                              name="skillCategoryId"
                              value={skill.skillCategoryId}
                              onChange={(e) => handleChange(e, "skills", index)}
                              className="w-32 p-2 m-2 border rounded"
                              placeholder="Category ID"
                            />
                            <input
                              type="number"
                              name="skillLevel"
                              value={skill.skillLevel}
                              onChange={(e) => handleChange(e, "skills", index)}
                              className="w-32 p-2 m-2 border rounded"
                              placeholder="Level (1-5)"
                              min="1"
                              max="5"
                            />
                            <input
                              type="number"
                              name="timespan"
                              value={skill.timespan}
                              onChange={(e) => handleChange(e, "skills", index)}
                              className="w-32 p-2 m-2 border rounded"
                              placeholder="Experience"
                            />
                            <input
                              type="text"
                              name="description"
                              value={skill.description}
                              onChange={(e) => handleChange(e, "skills", index)}
                              className="flex-1 p-2 m-2 border rounded"
                              placeholder="Description"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveItem("skills", index)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-blue-600 mb-2">
                            Skill Category ID: {skill.skillCategoryId}
                          </p>
                          <p className="text-sm">Level: {skill.skillLevel}/5</p>
                          <p className="text-sm">
                            Experience: {skill.timespan}{" "}
                            {skill.timespanUnit === 1 ? "Year" : "Years"}
                          </p>
                          <p className="mt-2 text-sm text-gray-600">
                            {skill.description}
                          </p>
                        </>
                      )}
                    </div>
                  )
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => handleAddItem("skills")}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add Skill
                </button>
              )}
            </ProfileSection>
          </div>

          {isEditing && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300 text-lg ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
