import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Smart School <span className="text-blue-600">Management System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Digitizing Your School Operations
          </p>
          <Link
            href="/demo"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Launch Demo → 
          </Link>
        </div>

        {/* Key Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Real-time Dashboard</h3>
            <p className="text-gray-600">Complete school overview at a glance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">👨‍👩‍👧</div>
            <h3 className="text-xl font-bold mb-2">Parent Portal</h3>
            <p className="text-gray-600">Real-time updates on child's progress</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Mobile Ready</h3>
            <p className="text-gray-600">Access from any device, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
}