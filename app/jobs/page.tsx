"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import { supabase } from "../supabaseClient";

const jobTypes = ["All", "Full-time", "Contract", "Part-time"];

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("id", { ascending: true });

      console.log("data:", data);
      console.log("error:", error);

      if (error) throw error;

      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-4">
            Loading jobs...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
          <p className="text-gray-500">
            {jobs.length} jobs available right now
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Locations</option>
            <option>Remote</option>
            <option>New York</option>
            <option>Seattle</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
            Search
          </button>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {jobTypes.map((type) => (
            <button
              key={type}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 text-sm font-medium transition"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              type={job.type}
              tags={job.tags}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
