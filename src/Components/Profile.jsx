import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Edit2,
  X
} from "lucide-react";
import "../Css/Profile.css";

const Profile = () => {
  const navigate = useNavigate(); // ✅ Navigation added

  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "Administrator",
    email: "admin@finance.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSaveAndRedirect = () => {
    // Optional: Save to localStorage if needed
    localStorage.setItem("profileData", JSON.stringify(profileData));

    // ✅ Navigate to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              location: ""
            });
            setShowModal(true);
          }}
        >
          <Edit2 size={16} color="#000" />
          Edit Profile
        </button>
      </div>

      <div className="profile-grid">
        {/* Left Card */}
        <div className="profile-card">
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="avatar-img"
                />
              ) : (
                <User size={60} color="#f5b400" />
              )}
            </div>

            <div
              className="avatar-edit"
              onClick={handleAvatarClick}
            >
              <Edit2 size={14} color="#ffffff" />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <h2>{profileData.name}</h2>
          <span className="role">Super Admin</span>

          <div className="divider"></div>

          <div className="status-row">
            <span>Status</span>
            <span className="active-dot">● Active</span>
          </div>

          <div className="member-row">
            <span>Member Since</span>
            <span>Jan 15, 2022</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="info-card">
            <h3>
              <Shield size={18} color="#f5b400" />
              Personal Information
            </h3>

            <div className="info-grid">
              <div className="info-box">
                <label>Full Name</label>
                <div className="input-box">
                  <User size={16} color="#ffffff" />
                  <span>{profileData.name}</span>
                </div>
              </div>

              <div className="info-box">
                <label>Email Address</label>
                <div className="input-box">
                  <Mail size={16} color="#ffffff" />
                  <span>{profileData.email}</span>
                </div>
              </div>

              <div className="info-box">
                <label>Phone Number</label>
                <div className="input-box">
                  <Phone size={16} color="#ffffff" />
                  <span>{profileData.phone}</span>
                </div>
              </div>

              <div className="info-box">
                <label>Location</label>
                <div className="input-box">
                  <MapPin size={16} color="#ffffff" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* ✅ SAVE BUTTON ADDED HERE */}
            <div className="info-save-wrapper">
              <button
                className="info-save-btn"
                onClick={handleSaveAndRedirect}
              >
                Save
              </button>
            </div>
          </div>

          <div className="info-card">
            <h3>
              <Calendar size={18} color="#f5b400" />
              Activity Overview
            </h3>

            <div className="activity-box">
              <div>
                <h4>Last Login</h4>
                <p>Your last successful login to the portal</p>
              </div>
              <span>Today, 10:30 AM</span>
            </div>

            <div className="activity-box">
              <div>
                <h4>Password Changed</h4>
                <p>Last time you updated your password</p>
              </div>
              <span>30 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <X
                size={18}
                color="#fff"
                className="close-icon"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <button
                className="save-btn"
                onClick={() => {
                  setProfileData({
                    name: formData.name || profileData.name,
                    email: formData.email || profileData.email,
                    phone: formData.phone || profileData.phone,
                    location: formData.location || profileData.location
                  });
                  setShowModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
