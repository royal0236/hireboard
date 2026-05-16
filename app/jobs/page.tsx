import Navbar from "../components/Navbar"
import JobCard from "../components/JobCard"

const jobs = [
  { id: 1, title: "Senior Frontend Developer", company: "Google", location: "Remote", salary: "$120k – $160k/yr", type: "Full-time", tags: ["React", "TypeScript", "Next.js"] },
  { id: 2, title: "Backend Engineer", company: "Stripe", location: "New York", salary: "$140k – $180k/yr", type: "Contract", tags: ["Node.js", "PostgreSQL"] },
  { id: 3, title: "UI/UX Designer", company: "Figma", location: "Remote", salary: "$80k – $110k/yr", type: "Part-time", tags: ["Figma", "Design Systems"] },
  { id: 4, title: "Data Scientist", company: "Netflix", location: "Remote", salary: "$130k – $170k/yr", type: "Full-time", tags: ["Python", "Machine Learning", "SQL"] },
  { id: 5, title: "DevOps Engineer", company: "Amazon", location: "Seattle", salary: "$150k – $190k/yr", type: "Full-time", tags: ["AWS", "Docker", "Kubernetes"] },
  { id: 6, title: "Mobile Developer", company: "Spotify", location: "Remote", salary: "$110k – $140k/yr", type: "Contract", tags: ["React Native", "iOS", "Android"] },
]

const jobTypes = ["All", "Full-time", "Contract", "Part-time"]

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
          <p className="text-gray-500">{jobs.length} jobs available right now</p>
        </div>

        {/* SEARCH + FILTER BAR */}
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

        {/* JOB TYPE FILTERS */}
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

        {/* JOB LIST */}
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

      </div>
    </main>
  )
}