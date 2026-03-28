'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  Users, GraduationCap, CreditCard, AlertCircle,
  TrendingUp, Calendar, Bell, Download, Search,
  Filter, MoreVertical, Eye, UserPlus, Settings,
  ChevronRight, Activity, BookOpen, Clock
} from 'lucide-react';

// Enhanced mock data
const attendanceData = [
  { month: 'Jan', present: 92, absent: 8 },
  { month: 'Feb', present: 94, absent: 6 },
  { month: 'Mar', present: 96, absent: 4 },
  { month: 'Apr', present: 93, absent: 7 },
  { month: 'May', present: 91, absent: 9 },
  { month: 'Jun', present: 95, absent: 5 },
];

const feeCollectionData = [
  { month: 'Jan', collected: 850000, target: 900000 },
  { month: 'Feb', collected: 920000, target: 900000 },
  { month: 'Mar', collected: 880000, target: 900000 },
  { month: 'Apr', collected: 950000, target: 900000 },
  { month: 'May', collected: 910000, target: 900000 },
  { month: 'Jun', collected: 1250000, target: 1200000 },
];

const performanceData = [
  { name: 'Class 6', avg: 82 },
  { name: 'Class 7', avg: 78 },
  { name: 'Class 8', avg: 85 },
  { name: 'Class 9', avg: 79 },
  { name: 'Class 10', avg: 88 },
];

const pieData = [
  { name: 'Boys', value: 1080, color: '#3B82F6' },
  { name: 'Girls', value: 920, color: '#EC4899' },
];

const recentActivities = [
  { id: 1, user: 'Rahul Sharma', action: 'Fee payment received', amount: '₹25,000', time: '2 min ago', icon: CreditCard },
  { id: 2, user: 'Mrs. Mehta', action: 'Marked attendance for Class 10B', time: '15 min ago', icon: Users },
  { id: 3, user: 'New Admission', action: 'Student enrolled - Priya Singh', time: '1 hour ago', icon: UserPlus },
  { id: 4, user: 'Report Generated', action: 'Monthly fee report', time: '2 hours ago', icon: Download },
];

const upcomingEvents = [
  { title: 'Parent-Teacher Meeting', date: 'April 15, 2026', time: '10:00 AM', type: 'meeting' },
  { title: 'Annual Sports Day', date: 'April 20, 2026', time: '9:00 AM', type: 'event' },
  { title: 'Fee Deadline', date: 'March 31, 2026', time: '11:59 PM', type: 'deadline' },
];

const mockStudents = [
  { id: 1, name: 'Rahul Sharma', class: '10B', rollNo: '101', attendance: 92, feeStatus: 'Paid', marks: { Math: 85, Science: 78, English: 88 }, avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=3B82F6&color=fff' },
  { id: 2, name: 'Priya Singh', class: '10B', rollNo: '102', attendance: 96, feeStatus: 'Pending', marks: { Math: 92, Science: 89, English: 94 }, avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=EC4899&color=fff' },
  { id: 3, name: 'Amit Patel', class: '6A', rollNo: '201', attendance: 88, feeStatus: 'Paid', marks: { Math: 75, Science: 82, English: 79 }, avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10B981&color=fff' },
  { id: 4, name: 'Neha Gupta', class: '6A', rollNo: '202', attendance: 94, feeStatus: 'Paid', marks: { Math: 88, Science: 91, English: 85 }, avatar: 'https://ui-avatars.com/api/?name=Neha+Gupta&background=F59E0B&color=fff' },
];

export default function EnhancedAdminDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(true);

  const filteredStudents = mockStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { title: 'Total Students', value: '2,000', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Teachers', value: '50', change: '+5%', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Fees Collected', value: '₹12.5L', change: '+18%', icon: CreditCard, color: 'bg-purple-500' },
    { title: 'Pending Fees', value: '₹3.2L', change: '-8%', icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-20"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🏫</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Smart School ERP
              </h2>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {[
              { name: 'Dashboard', icon: Activity, tab: 'overview' },
              { name: 'Students', icon: Users, tab: 'students' },
              { name: 'Attendance', icon: Calendar, tab: 'attendance' },
              { name: 'Fees', icon: CreditCard, tab: 'fees' },
              { name: 'Reports', icon: Download, tab: 'reports' },
              { name: 'Settings', icon: Settings, tab: 'settings' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.tab
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
                {activeTab === item.tab && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        {/* Header with Welcome */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800"
            >
              Welcome back, Admin
            </motion.h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your school today</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} className="text-gray-600" />
              {notifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="flex items-center space-x-3">
              <img 
                src="https://ui-avatars.com/api/?name=Admin&background=3B82F6&color=fff"
                alt="Admin"
                className="w-10 h-10 rounded-full ring-2 ring-blue-500"
              />
              <div>
                <p className="font-medium text-sm">Ankush Kumar</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Animations */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Fee Collection Trend</h3>
              <button className="text-blue-600 text-sm hover:underline">View Details</button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={feeCollectionData}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="collected" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCollected)" />
                <Line type="monotone" dataKey="target" stroke="#10B981" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Class Performance</h3>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avg" fill="#3B82F6">
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avg > 85 ? '#10B981' : '#3B82F6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Students List & Activity */}
        <div className="grid grid-cols-3 gap-6">
          {/* Students List */}
          <div className="col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Students Directory</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Filter size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  onClick={() => setSelectedStudent(student)}
                  className="p-4 cursor-pointer transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-gray-500">Class {student.class} | Roll No: {student.rollNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${student.attendance >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
                          {student.attendance}% Attendance
                        </p>
                        <p className={`text-xs ${student.feeStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                          {student.feeStatus}
                        </p>
                      </div>
                      <Eye size={18} className="text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity & Events */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <activity.icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                      {activity.amount && (
                        <p className="text-xs font-semibold text-green-600">{activity.amount}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {event.type === 'meeting' && '👥'}
                      {event.type === 'event' && '🏆'}
                      {event.type === 'deadline' && '⏰'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{event.title}</p>
                      <p className="text-xs text-white/80">{event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Profile Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-20 h-20 rounded-full border-4 border-white" />
                    <div>
                      <h3 className="text-2xl font-bold">{selectedStudent.name}</h3>
                      <p className="text-white/80">Class {selectedStudent.class} • Roll No: {selectedStudent.rollNo}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="text-white/80 hover:text-white">
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-500 text-sm">Attendance Rate</p>
                    <p className={`text-2xl font-bold ${selectedStudent.attendance >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
                      {selectedStudent.attendance}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`h-2 rounded-full ${selectedStudent.attendance >= 90 ? 'bg-green-500' : 'bg-orange-500'}`} 
                           style={{ width: `${selectedStudent.attendance}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-500 text-sm">Fee Status</p>
                    <p className={`text-2xl font-bold ${selectedStudent.feeStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedStudent.feeStatus}
                    </p>
                    {selectedStudent.feeStatus === 'Pending' && (
                      <button className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded-lg">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-lg mb-3">Academic Performance</p>
                  <div className="space-y-3">
                    {Object.entries(selectedStudent.marks).map(([subject, marks]) => (
                      <div key={subject}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject}</span>
                          <span className="font-semibold">{marks}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${marks}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Download Full Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}