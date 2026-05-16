type JobCardProps = {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  tags: string[]
}

export default function JobCard({ id, title, company, location, salary, type, tags }: JobCardProps) {

  const typeColor: Record<string, string> = {
    "Full-time": "bg-green-100 text-green-700",
    "Contract": "bg-yellow-100 text-yellow-700",
    "Part-time": "bg-purple-100 text-purple-700",
  }

  return (
    <a href={`/jobs/${id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-gray-900">{title}</h4>
          <span className={`text-sm px-3 py-1 rounded-full ${typeColor[type]}`}>{type}</span>
        </div>
        <p className="text-gray-500 mb-3">{company} · {location} · {salary}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}