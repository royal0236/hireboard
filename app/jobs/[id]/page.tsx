'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import ApplyModal from "../../components/ApplyModal";
import { supabase } from "../../supabaseClient";

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  async function fetchJob() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !data) {
      setJob(null);
    } else {
      setJob(data);
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

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <a href="/jobs" className="text-blue-600 hover:underline">
            Back to Jobs
          </a>
        </div>
      </main>
    );
  }

  const typeColor: Record<string, string> = {
    "Full-time": "bg-green-100 text-green-700",
    Contract: "bg-yellow-100 text-yellow-700",
    "Part-time": "bg-purple-100 text-purple-700",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {showModal && (
        <ApplyModal
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        <a
          href="/jobs"
          className="text-blue-600 hover:underline text-sm mb-6 inline-block"
        >
          ← Back to Jobs
        </a>

        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-gray-500 text-lg">
                {job.company} · {job.location} · {job.salary}
              </p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${typeColor[job.type]}`}
            >
              {job.type}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {job.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Posted {new Date(job.posted_at).toLocaleDateString()}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium text-lg"
            >
              Apply Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                About the Role
              </h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Responsibilities
              </h2>
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((item: string) => (
                  <li
                    key={item}
                    className="text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Requirements
              </h2>
              <ul className="flex flex-col gap-2">
                {job.requirements.map((item: string) => (
                  <li
                    key={item}
                    className="text-gray-600 flex items-start gap-2"
                  >
                    <span className="text-blue-500 mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Job Overview
              </h2>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-gray-400 text-sm">Company</p>
                  <p className="text-gray-800 font-medium">{job.company}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-gray-800 font-medium">{job.location}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Job Type</p>
                  <p className="text-gray-800 font-medium">{job.type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Salary</p>
                  <p className="text-gray-800 font-medium">{job.salary}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Posted</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(job.posted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium"
            >
              Apply Now
            </button>
            <button className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl hover:border-blue-500 hover:text-blue-600 font-medium">
              Save Job
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
