'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Calendar, BookOpen, CheckCircle, Clock,
  Download, Search, Filter, MessageCircle, Send,
  ChevronRight, TrendingUp, Award, Bell
} from 'lucide-react';

const classes = ['6A', '6B', '10A', '10B'];
const studentsData = {
  '6A': [
    { id: 1, name: 'Amit Patel', rollNo: '1', present: true, previousAttendance: 88, marks: { homework: 85, classwork: 90 } },
    { id: 2, name: 'Neha Gupta', rollNo: '2', present: true, previousAttendance: 94, marks: { homework: 92, classwork: 88 } },
    { id: 3, name: 'Rohan Mehta', rollNo: '3', present: false, previousAttendance: 76, marks: { homework: 70, classwork: 75 } },
    { id: 4, name: 'Sneha Reddy', rollNo: '4', present: true, previousAttendance: 91, marks: { homework: 88, classwork: 85 } },
    { id: 5, name: 'Kunal Verma', rollNo: '5', present: false, previousAttendance: 82, marks: { homework: 78, classwork: 80 } },
  ],
  '10B': [
    { id: 1, name: 'Rahul Sharma', rollNo: '1', present: true, previousAttendance: 92, marks: { homework: 85, classwork: 88 } },
    { id: 2, name: 'Priya Singh', rollNo: '2', present: true, previousAttendance: 96, marks: { homework: 94, classwork: 92 } },
    { id: 3, name: 'Vikram Singh', rollNo: '3', present: false, previousAttendance: 78, marks: { homework: 72, classwork: 75 } },
    { id: 4, name: 'Anjali Nair', rollNo: '4', present: true, previousAttendance: 89, marks: { homework: 86, classwork: 84 } },
  ],
};

export default function EnhancedTeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState('6A');
  const [students, setStudents] = useState(studentsData['6A']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [homework, setHomework] = useState('');

  const toggleAttendance = (studentId) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, present: !s.present } : s
    ));
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const attendanceRate = (students.filter(s => s.present).length / students.length) * 100;

  const recentActivities = [
    { student: 'Rahul Sharma', action: 'Submitted homework', time: '10 mins ago', type: 'homework' },
    { student: 'Priya Singh', action: 'Asked a question', time: '25 mins ago', type: 'question' },
    { student: 'Amit Patel', action: 'Completed quiz', time: '1 hour ago', type: 'quiz' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Mrs. Mehta</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <img src="https://ui-avatars.com/api/?name=Mehta&background=3B82F6&color=fff" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium text-sm">Mrs. Mehta</p>
                <p className="text-xs text-gray-500">Class Teacher</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'My Classes', value: '4', icon: BookOpen, color: 'bg-blue-500' },
            { title: 'Total Students', value: '124', icon: Users, color: 'bg-green-500' },
            { title: 'Today\'s Attendance', value: `${Math.round(attendanceRate)}%`, icon: CheckCircle, color: 'bg-purple-500' },
            { title: 'Hours Saved', value: '2-3 hrs', icon: Clock, color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Class Selection & Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {['Attendance', 'Homework', 'Messages'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === tab.toLowerCase()
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setStudents(studentsData[e.target.value] || []);
                }}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classes.map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'attendance' && (
                <motion.div
                  key="attendance"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold">Mark Attendance - Class {selectedClass}</h2>
                      <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Present Today</p>
                        <p className="text-2xl font-bold text-green-600">{students.filter(s => s.present).length}/{students.length}</p>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        Submit Attendance
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {students.map(student => (
                      <motion.div
                        key={student.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <div className="flex items-center space-x-4">
                          <img src={`https://ui-avatars.com/api/?name=${student.name}&background=3B82F6&color=fff`} className="w-10 h-10 rounded-full" />
                          <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAttendance(student.id);
                          }}
                          className={`px-4 py-2 rounded-lg transition ${
                            student.present
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          }`}
                        >
                          {student.present ? '✓ Present' : '✗ Absent'}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'homework' && (
                <motion.div
                  key="homework"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-bold mb-4">Assign Homework</h2>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <label className="block text-sm font-medium mb-2">Class {selectedClass}</label>
                    <textarea
                      value={homework}
                      onChange={(e) => setHomework(e.target.value)}
                      placeholder="Enter homework details..."
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                    />
                    <button className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                      Post Homework
                    </button>
                  </div>

                  <h3 className="font-semibold text-lg mb-3">Recent Homework</h3>
                  <div className="space-y-3">
                    {[
                      { subject: 'Mathematics', task: 'Complete Exercise 12.1', date: 'Mar 27, 2026' },
                      { subject: 'Science', task: 'Write about photosynthesis', date: 'Mar 26, 2026' },
                    ].map((hw, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-semibold">{hw.subject}</p>
                        <p className="text-sm text-gray-600 mt-1">{hw.task}</p>
                        <p className="text-xs text-gray-400 mt-2">Posted: {hw.date}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-xl font-bold mb-4">Parent Messages</h2>
                  <div className="space-y-3">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <MessageCircle size={20} className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-semibold">{activity.student}'s Parent</p>
                            <p className="text-sm text-gray-600">{activity.action}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 text-sm hover:underline">Reply</button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition"
          >
            <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
              <Download size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold">Generate Reports</h3>
            <p className="text-sm text-gray-500 mt-1">Download class performance report</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition"
          >
            <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold">View Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Track class performance trends</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition"
          >
            <div className="p-3 bg-purple-100 rounded-xl w-fit mb-3">
              <Award size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold">Top Performers</h3>
            <p className="text-sm text-gray-500 mt-1">View student achievements</p>
          </motion.button>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <CheckCircle size={20} />
            <span>✓ Attendance updated! Parents can now view this.</span>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-white rounded-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <img src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=3B82F6&color=fff&size=80`} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                <p className="text-gray-500">Roll No: {selectedStudent.rollNo}</p>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Attendance Rate</span>
                  <span className="font-semibold">{selectedStudent.previousAttendance}%</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Homework Average</span>
                  <span className="font-semibold">{selectedStudent.marks.homework}%</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Classwork Average</span>
                  <span className="font-semibold">{selectedStudent.marks.classwork}%</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}