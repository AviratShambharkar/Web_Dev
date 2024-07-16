//components/Profile

import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        console.log("User data:", data); // Check the structure and content of `data`
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Ensure user.profile and its properties are defined
  const { profile = {}, email, preferences = {} } = user;
  const { avatarUrl, name, bio } = profile;
  const { programmingLanguage, theme } = preferences;

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <img
            src={avatarUrl || "default-avatar-url"} // Provide a default avatar URL if none is available
            alt="Avatar"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{name || "Anonymous"}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Bio</h3>
          <p>
            {bio || "This user prefers to keep an air of mystery about them."}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Preferences</h3>
          <p>Programming Language: {programmingLanguage || "Python"}</p>
          <p>Theme: {theme || "dark"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
