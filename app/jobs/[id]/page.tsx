import Navbar from "../../components/Navbar"

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Remote",
    salary: "$120k – $160k/yr",
    type: "Full-time",
    tags: ["React", "TypeScript", "Next.js"],
    description: "We are looking for a Senior Frontend Developer to join our team at Google. You will be responsible for building and maintaining high-quality web applications used by billions of people worldwide.",
    responsibilities: [
      "Build and maintain scalable frontend applications",
      "Collaborate with designers and backend engineers",
      "Review code and mentor junior developers",
      "Improve performance and user experience",
    ],
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with Next.js",
      "Good understanding of web performance",
    ],
    postedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Stripe",
    location: "New York",
    salary: "$140k – $180k/yr",
    type: "Contract",
    tags: ["Node.js", "PostgreSQL"],
    description: "Stripe is looking for a Backend Engineer to help build the financial infrastructure of the internet. You will work on APIs that process billions of dollars in payments every year.",
    responsibilities: [
      "Design and build scalable APIs",
      "Work with databases and data pipelines",
      "Ensure security and compliance of payment systems",
      "Collaborate with product and frontend teams",
    ],
    requirements: [
      "3+ years of backend experience",
      "Strong Node.js skills",
      "Experience with PostgreSQL",
      "Understanding of payment systems is a plus",
    ],
    postedAt: "1 day ago",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Figma",
    location: "Remote",
    salary: "$80k – $110k/yr",
    type: "Part-time",
    tags: ["Figma", "Design Systems"],
    description: "Figma is hiring a UI/UX Designer to help shape the future of design tools. You will work directly with the product team to create beautiful, intuitive experiences.",
    responsibilities: [
      "Design user interfaces for web and mobile",
      "Build and maintain our design system",
      "Conduct user research and usability testing",
      "Work closely with engineers to ship designs",
    ],
    requirements: [
      "3+ years of UI/UX experience",
      "Expert-level Figma skills",
      "Experience with design systems",
      "Strong portfolio of shipped products",
    ],
    postedAt: "3 days ago",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Netflix",
    location: "Remote",
    salary: "$130k – $170k/yr",
    type: "Full-time",
    tags: ["Python", "Machine Learning", "SQL"],
    description: "Netflix is seeking a Data Scientist to help us understand our 200+ million subscribers and improve content recommendations worldwide.",
    responsibilities: [
      "Build machine learning models for recommendations",
      "Analyze large datasets to find insights",
      "Work with engineering to deploy models",
      "Present findings to leadership",
    ],
    requirements: [
      "4+ years in data science or ML",
      "Strong Python and SQL skills",
      "Experience with recommendation systems",
      "PhD or Masters preferred",
    ],
    postedAt: "5 days ago",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Seattle",
    salary: "$150k – $190k/yr",
    type: "Full-time",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Amazon is looking for a DevOps Engineer to help scale our cloud infrastructure. You will work on systems that serve millions of customers every second.",
    responsibilities: [
      "Manage and scale AWS infrastructure",
      "Build CI/CD pipelines",
      "Monitor system performance and reliability",
      "Automate infrastructure with code",
    ],
    requirements: [
      "5+ years of DevOps experience",
      "Deep AWS knowledge",
      "Experience with Docker and Kubernetes",
      "Strong scripting skills",
    ],
    postedAt: "1 week ago",
  },
  {
    id: 6,
    title: "Mobile Developer",
    company: "Spotify",
    location: "Remote",
    salary: "$110k – $140k/yr",
    type: "Contract",
    tags: ["React Native", "iOS", "Android"],
    description: "Spotify is hiring a Mobile Developer to help build the best music experience on iOS and Android. You will work on features used by 500+ million listeners.",
    responsibilities: [
      "Build features for iOS and Android apps",
      "Optimize app performance and startup time",
      "Work with designers on new features",
      "Write tests and maintain code quality",
    ],
    requirements: [
      "3+ years of mobile development",
      "Strong React Native experience",
      "Understanding of iOS and Android platforms",
      "Experience with audio or media apps is a plus",
    ],
    postedAt: "4 days ago",
  },
]

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = jobs.find((j) => j.id === parseInt(id))

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <a href="/jobs" className="text-blue-600 hover:underline">Back to Jobs</a>
        </div>
      </main>
    )
  }

  const typeColor: Record<string, string> = {
    "Full-time": "bg-green-100 text-green-700",
    "Contract": "bg-yellow-100 text-yellow-700",
    "Part-time": "bg-purple-100 text-purple-700",
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">

        <a href="/jobs" className="text-blue-600 hover:underline text-sm mb-6 inline-block">← Back to Jobs</a>

        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-gray-500 text-lg">{job.company} · {job.location} · {job.salary}</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${typeColor[job.type]}`}>{job.type}</span>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {job.tags.map((tag) => (
              <span key={tag} className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Posted {job.postedAt}</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium text-lg">
              Apply Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 flex flex-col gap-6">

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About the Role</h2>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Responsibilities</h2>
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((item) => (
                  <li key={item} className="text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Requirements</h2>
              <ul className="flex flex-col gap-2">
                {job.requirements.map((item) => (
                  <li key={item} className="text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h2>
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
                  <p className="text-gray-800 font-medium">{job.postedAt}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-medium">
              Apply Now
            </button>
            <button className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl hover:border-blue-500 hover:text-blue-600 font-medium">
              Save Job
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}