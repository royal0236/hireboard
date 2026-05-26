"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUserAndFetch();
  }, []);

  async function checkUserAndFetch() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setUser(userData.user);

    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        name,
        email,
        cover_letter,
        applied_at,
        jobs (
          id,
          title,
          company,
          location,
          type,
          salary
        )
      `,
      )
      .eq("user_id", userData.user.id)
      .order("applied_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setApplications(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-4xl font-bold text-gray-900">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-500">
            {applications.length}{" "}
            {applications.length === 1 ? "application" : "applications"}{" "}
            submitted
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
            <p className="text-5xl mb-4">📋</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start applying to jobs to track them here
            </p>

            <a>
              {" "}
              href="/jobs" className="bg-blue-600 text-white px-6 py-3
              rounded-lg hover:bg-blue-700 font-medium" Browse Jobs
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {app.jobs.title}
                    </h2>
                    <p className="text-gray-500">
                      {app.jobs.company} · {app.jobs.location} ·{" "}
                      {app.jobs.salary}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    Applied
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Your Cover Letter
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {app.cover_letter}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">
                    Applied on{" "}
                    {new Date(app.applied_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* <a>
                    href={`/jobs/${app.jobs.id}`}
                    className="text-blue-600 hover:underline text-sm
                    font-medium" View Job →
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
