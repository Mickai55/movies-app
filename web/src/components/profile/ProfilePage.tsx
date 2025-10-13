import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

// @ts-ignore
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

const ProfilePage: React.FC = () => {
  const { user, refresh } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatarUrl(user.avatarUrl ?? "");
    }
  }, [user]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, avatarUrl }),
    });
    if (res.ok) {
      setMsg("Profile updated!");
      await refresh();
    } else {
      setMsg("Failed to update profile");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Your Profile</h1>

      {msg && <p className="text-center text-sm text-green-600 mb-2">{msg}</p>}

      <form onSubmit={saveProfile} className="flex flex-col gap-3">
        <label className="text-sm font-medium">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
        <label className="text-sm font-medium">Email</label>
        <input
          value={email}
          disabled
          className="border rounded-md px-3 py-2"
        />

        <label className="text-sm font-medium">Profile Picture URL</label>
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="border rounded-md px-3 py-2"
          placeholder="https://example.com/avatar.jpg"
        />

        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
          />
        )}

        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
