"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <a href="/" className="text-2xl font-bold text-blue-600">
        HireBoard
      </a>
      <div className="flex gap-4 items-center">
        <a
          href="/jobs"
          className="text-gray-600 hover:text-blue-600 font-medium"
        >
          Browse Jobs
        </a>

       {user ? (
  <>
    <span className="text-gray-500 text-sm">{user.email}</span>
    <a href="/my-applications" className="text-gray-600 hover:text-blue-600 font-medium">My Applications</a>
    <a href="/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Post a Job</a>
    <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 font-medium text-sm">Logout</button>
  </>
        ) : (
          <>
            <a
              href="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
