import Navbar from "./components/Navbar"
import JobCard from "./components/JobCard"

const jobs = [
  { id: 1, title: "Senior Frontend Developer", company: "Google", location: "Remote", salary: "$120k – $160k/yr", type: "Full-time", tags: ["React", "TypeScript", "Next.js"] },
  { id: 2, title: "Backend Engineer", company: "Stripe", location: "New York", salary: "$140k – $180k/yr", type: "Contract", tags: ["Node.js", "PostgreSQL"] },
  { id: 3, title: "UI/UX Designer", company: "Figma", location: "Remote", salary: "$80k – $110k/yr", type: "Part-time", tags: ["Figma", "Design Systems"] },
  { id: 4, title: "Data Scientist", company: "Netflix", location: "Remote", salary: "$130k – $170k/yr", type: "Full-time", tags: ["Python", "Machine Learning", "SQL"] },
  { id: 5, title: "DevOps Engineer", company: "Amazon", location: "Seattle", salary: "$150k – $190k/yr", type: "Full-time", tags: ["AWS", "Docker", "Kubernetes"] },
  { id: 6, title: "Mobile Developer", company: "Spotify", location: "Remote", salary: "$110k – $140k/yr", type: "Contract", tags: ["React Native", "iOS", "Android"] },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Find Your Dream Job</h2>
        <p className="text-xl text-gray-500 mb-8">Thousands of jobs from top companies. Apply in one click.</p>
        <div className="flex justify-center gap-3">
          <input
            type="text"
            placeholder="Job title, keyword..."
            className="border border-gray-300 rounded-lg px-4 py-3 w-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">Search Jobs</button>
        </div>
      </section>

      {/* JOB CARDS */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Latest Jobs</h3>
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>

    </main>
  )
}