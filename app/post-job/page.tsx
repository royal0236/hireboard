"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";

export default function PostJobPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("Full-time");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/login";
      } else {
        setUser(data.user);
      }
    });
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const { error } = await supabase.from("jobs").insert({
      title,
      company,
      location,
      salary,
      type,
      tags: tags.split(",").map((t) => t.trim()),
      description,
      responsibilities: responsibilities
        .split("\n")
        .filter((r) => r.trim() !== ""),
      requirements: requirements.split("\n").filter((r) => r.trim() !== ""),
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  }

  if (!user) {
    return null;
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-md mx-auto px-6 py-20 text-center">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Posted!
            </h1>
            <p className="text-gray-500 mb-6">
              Your job listing is now live on HireBoard.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/jobs"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium text-center"
              >
                View All Jobs
              </a>
              <button
                onClick={() => setSuccess(false)}
                className="border border-gray-300 text-gray-600 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 font-medium"
              >
                Post Another Job
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-500">
            Fill in the details below to list your job on HireBoard
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col gap-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote or New York"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $80k – $100k/yr"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Job Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Skills / Tags
                  <span className="text-gray-400 font-normal ml-1">
                    (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, TypeScript, Node.js"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Job Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Job Description
                </label>
                <textarea
                  placeholder="Describe the role and your company..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Responsibilities
                  <span className="text-gray-400 font-normal ml-1">
                    (one per line)
                  </span>
                </label>
                <textarea
                  placeholder="Build and maintain scalable applications&#10;Collaborate with designers&#10;Review code and mentor juniors"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Requirements
                  <span className="text-gray-400 font-normal ml-1">
                    (one per line)
                  </span>
                </label>
                <textarea
                  placeholder="3+ years of React experience&#10;Strong TypeScript skills&#10;Experience with Next.js"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-medium text-lg disabled:opacity-50"
          >
            {loading ? "Posting Job..." : "Post Job →"}
          </button>
        </div>
      </div>
    </main>
  );
} 

