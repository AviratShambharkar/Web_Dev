import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Add Navbar component to maintain consistency
import { getUserProfile, updateUserProfile } from "../services/userService";

function EditProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "", bio: "", avatarUrl: "" });
  const [preferences, setPreferences] = useState({
    programmingLanguage: "",
    theme: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
        setProfile(data.profile);
        setPreferences(data.preferences);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: newName,
      avatarUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${newName}`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ profile, preferences });
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white pt-20">
        <div className="w-full max-w-4xl p-4 bg-white rounded shadow-lg text-gray-900">
          <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={handleNameChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Avatar URL</label>
              <input
                type="text"
                value={profile.avatarUrl}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Programming Language
              </label>
              <select
                value={preferences.programmingLanguage}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    programmingLanguage: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) =>
                  setPreferences({ ...preferences, theme: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
