'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import {
  Bell, TrendingUp, Calendar, Download, CreditCard,
  User, BookOpen, Clock, ChevronRight, Award,
  MessageCircle, Eye, ThumbsUp, AlertTriangle
} from 'lucide-react';
const childData = {
  name: 'Rahul Sharma',
  class: '10B',
  rollNo: '101',
  attendance: 92,
  feeDue: '₹5,000',
  feeTotal: '₹25,000',
  profileImage: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=3B82F6&color=fff&size=128',
  attendanceTrend: [
    { month: 'Jan', percentage: 88 },
    { month: 'Feb', percentage: 90 },
    { month: 'Mar', percentage: 92 },
    { month: 'Apr', percentage: 94 },
    { month: 'May', percentage: 92 },
  ],
  marks: [
    { subject: 'Mathematics', marks: 85, max: 100, grade: 'A', trend: '+5%' },
    { subject: 'Science', marks: 78, max: 100, grade: 'B+', trend: '+2%' },
    { subject: 'English', marks: 88, max: 100, grade: 'A', trend: '+8%' },
    { subject: 'Hindi', marks: 82, max: 100, grade: 'A-', trend: '+3%' },
    { subject: 'Social Studies', marks: 76, max: 100, grade: 'B', trend: '-1%' },
  ],
  notifications: [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'April 15, 2026', type: 'meeting', read: false, message: 'Please schedule your slot for the upcoming parent-teacher meeting.' },
    { id: 2, title: 'Fee Payment Reminder', date: 'March 28, 2026', type: 'fee', read: false, message: 'Last date for fee payment is March 31st.' },
    { id: 3, title: 'Annual Sports Day', date: 'April 20, 2026', type: 'event', read: true, message: 'Your child has been selected for the 100m race.' },
    { id: 4, title: 'Homework Assigned', date: 'March 27, 2026', type: 'homework', read: true, message: 'Maths: Complete exercise 12.1' },
  ],
  timetable: [
    { day: 'Monday', subjects: ['Maths', 'Science', 'English', 'Hindi', 'Physical Ed'] },
    { day: 'Tuesday', subjects: ['Science', 'Maths', 'Social Studies', 'English', 'Computer'] },
    { day: 'Wednesday', subjects: ['English', 'Hindi', 'Maths', 'Science', 'Art'] },
    { day: 'Thursday', subjects: ['Maths', 'Science', 'Social Studies', 'English', 'Physical Ed'] },
    { day: 'Friday', subjects: ['Hindi', 'English', 'Maths', 'Science', 'Computer'] },
  ],
  achievements: [
    { title: 'Math Olympiad', rank: '2nd Place', date: 'Feb 2026', icon: Award },
    { title: 'Science Exhibition', rank: 'Best Project', date: 'Jan 2026', icon: Award },
  ],
};

const performanceData = [
  { subject: 'Maths', marks: 85, average: 72 },
  { subject: 'Science', marks: 78, average: 70 },
  { subject: 'English', marks: 88, average: 75 },
  { subject: 'Hindi', marks: 82, average: 71 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function EnhancedParentPortal() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🏫</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Parent Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-500">{liveTime.toLocaleDateString()}</p>
              <p className="text-xs text-gray-400">{liveTime.toLocaleTimeString()}</p>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3">
              <img src={childData.profileImage} alt="Child" className="w-10 h-10 rounded-full ring-2 ring-blue-500" />
              <div className="hidden md:block">
                <p className="font-medium text-sm">Welcome, Parent</p>
                <p className="text-xs text-gray-500">{childData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hello, Parent! 👋</h2>
              <p className="text-white/90">Track your child's progress in real-time</p>
              <div className="mt-4 flex space-x-4">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <p className="text-sm">Your Child</p>
                  <p className="font-bold">{childData.name}</p>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <p className="text-sm">Class</p>
                  <p className="font-bold">{childData.class}</p>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <p className="text-sm">Roll No</p>
                  <p className="font-bold">{childData.rollNo}</p>
                </div>
              </div>
            </div>
            <div className="text-6xl opacity-20">👨‍👩‍👧</div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <User size={24} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{childData.attendance}%</span>
            </div>
            <h3 className="font-semibold text-gray-800">Attendance Rate</h3>
            <p className="text-sm text-gray-500 mt-1">Excellent! Above 90%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${childData.attendance}%` }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <CreditCard size={24} className="text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{childData.feeDue}</span>
            </div>
            <h3 className="font-semibold text-gray-800">Fee Due</h3>
            <p className="text-sm text-gray-500 mt-1">Due by March 31, 2026</p>
            <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
              Pay Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Award size={24} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">85%</span>
            </div>
            <h3 className="font-semibold text-gray-800">Average Marks</h3>
            <p className="text-sm text-gray-500 mt-1">Above class average</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'marks', label: 'Marks & Report', icon: BookOpen },
              { id: 'attendance', label: 'Attendance', icon: Calendar },
              { id: 'timetable', label: 'Timetable', icon: Clock },
              { id: 'achievements', label: 'Achievements', icon: Award },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Performance Chart */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Performance vs Class Average</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="marks" fill="#3B82F6" name="Your Child" />
                        <Bar dataKey="average" fill="#9CA3AF" name="Class Average" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Recent Notifications */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Recent Updates</h3>
                    <div className="space-y-3">
                      {childData.notifications.slice(0, 3).map((notif) => (
                        <div key={notif.id} className={`p-4 rounded-xl border ${!notif.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold">{notif.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
                            </div>
                            {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'marks' && (
                <motion.div
                  key="marks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Latest Report Card</h3>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {childData.marks.map((subject, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="font-semibold">{subject.subject}</p>
                            <p className="text-xs text-gray-500">Grade: {subject.grade}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">{subject.marks}<span className="text-sm text-gray-500">/{subject.max}</span></p>
                            <p className={`text-xs ${subject.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {subject.trend} from last term
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(subject.marks / subject.max) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'attendance' && (
                <motion.div
                  key="attendance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="font-semibold text-lg mb-4">Attendance Trend</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={childData.attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="percentage" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-6 bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <ThumbsUp size={24} className="text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Excellent Attendance Record!</p>
                        <p className="text-sm text-green-700">Your child has maintained {childData.attendance}% attendance this term.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'timetable' && (
                <motion.div
                  key="timetable"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-4">
                    {childData.timetable.map((day) => (
                      <div key={day.day} className="bg-gray-50 rounded-xl p-4">
                        <p className="font-semibold text-lg mb-3">{day.day}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.subjects.map((subject, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm shadow-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {childData.achievements.map((achievement, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-yellow-100 rounded-xl">
                            <Award size={32} className="text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-bold text-lg">{achievement.title}</p>
                            <p className="text-orange-600 font-semibold">{achievement.rank}</p>
                            <p className="text-sm text-gray-500">{achievement.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, label: 'Message Teacher', color: 'bg-blue-600' },
            { icon: CreditCard, label: 'Pay Fees', color: 'bg-green-600' },
            { icon: Calendar, label: 'Schedule Meeting', color: 'bg-purple-600' },
            { icon: Download, label: 'Download Reports', color: 'bg-orange-600' },
          ].map((action, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${action.color} text-white rounded-xl p-4 flex flex-col items-center space-y-2 shadow-lg hover:shadow-xl transition`}
            >
              <action.icon size={24} />
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating Live Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-4 max-w-sm border-l-4 border-blue-600"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell size={16} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">New Notification</p>
                <p className="text-xs text-gray-600">Parent-Teacher Meeting scheduled for April 15th</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}