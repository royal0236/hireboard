export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <a href="/" className="text-2xl font-bold text-blue-600">HireBoard</a>
      <div className="flex gap-4">
        <a href="/jobs" className="text-gray-600 hover:text-blue-600 font-medium">Browse Jobs</a>
        <a href="/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">Post a Job</a>
      </div>
    </nav>
  )
}