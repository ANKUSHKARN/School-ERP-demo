'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Download, Search, Filter, Eye,
  CheckCircle, XCircle, Clock, TrendingUp,
  Calendar, FileText, Send
} from 'lucide-react';

const feeData = [
  { id: 1, name: 'Rahul Sharma', class: '10B', rollNo: '101', amount: 25000, status: 'Paid', dueDate: '2026-03-15', paymentDate: '2026-03-10', transactionId: 'TXN123456' },
  { id: 2, name: 'Priya Singh', class: '10B', rollNo: '102', amount: 25000, status: 'Pending', dueDate: '2026-03-15', paymentDate: null, transactionId: null },
  { id: 3, name: 'Amit Patel', class: '6A', rollNo: '201', amount: 20000, status: 'Paid', dueDate: '2026-03-20', paymentDate: '2026-03-18', transactionId: 'TXN123457' },
  { id: 4, name: 'Neha Gupta', class: '6A', rollNo: '202', amount: 20000, status: 'Paid', dueDate: '2026-03-20', paymentDate: '2026-03-19', transactionId: 'TXN123458' },
  { id: 5, name: 'Vikram Singh', class: '10B', rollNo: '103', amount: 25000, status: 'Pending', dueDate: '2026-03-15', paymentDate: null, transactionId: null },
  { id: 6, name: 'Anjali Nair', class: '10B', rollNo: '104', amount: 25000, status: 'Overdue', dueDate: '2026-03-15', paymentDate: null, transactionId: null },
];

export default function EnhancedFeeManagement() {
  const [students, setStudents] = useState(feeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePay = (studentId) => {
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, status: 'Paid', paymentDate: new Date().toISOString().split('T')[0], transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}` }
        : s
    ));
    setShowPaymentModal(false);
    setSelectedStudent(null);
    alert('Payment successful! Receipt has been sent to parent\'s email.');
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || s.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalCollected = students.filter(s => s.status === 'Paid').reduce((acc, s) => acc + s.amount, 0);
  const totalPending = students.filter(s => s.status === 'Pending' || s.status === 'Overdue').reduce((acc, s) => acc + s.amount, 0);
  const collectionRate = (totalCollected / (totalCollected + totalPending)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>
          <p className="text-gray-500 mt-1">Track and manage fee collection efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Collection', value: `₹${(totalCollected / 100000).toFixed(1)}L`, change: '+18%', icon: TrendingUp, color: 'bg-green-500' },
            { title: 'Pending Collection', value: `₹${(totalPending / 100000).toFixed(1)}L`, change: '-8%', icon: Clock, color: 'bg-red-500' },
            { title: 'Collection Rate', value: `${collectionRate.toFixed(1)}%`, change: '+5%', icon: CheckCircle, color: 'bg-blue-500' },
            { title: 'Due Students', value: students.filter(s => s.status !== 'Paid').length, change: '-3', icon: XCircle, color: 'bg-orange-500' },
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
                  <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fee Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or roll no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                  <Download size={18} />
                  <span>Export</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Send size={18} />
                  <span>Send Reminders</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredStudents.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={`https://ui-avatars.com/api/?name=${student.name}&background=3B82F6&color=fff`} className="w-8 h-8 rounded-full" />
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{student.class}</td>
                    <td className="px-6 py-4">{student.rollNo}</td>
                    <td className="px-6 py-4 font-semibold">₹{student.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{student.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        student.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {student.status !== 'Paid' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(student);
                            setShowPaymentModal(true);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Collect Payment
                        </button>
                      ) : (
                        <button className="text-gray-400 cursor-not-allowed px-4 py-2 rounded-lg text-sm" disabled>
                          Paid
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Modal */}
        <AnimatePresence>
          {showPaymentModal && selectedStudent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedStudent(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">Fee Payment</h3>
                  <p className="text-gray-500 mt-1">{selectedStudent.name} • Class {selectedStudent.class}</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Amount Due</span>
                      <span className="text-2xl font-bold text-blue-600">₹{selectedStudent.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Due Date</span>
                      <span>{selectedStudent.dueDate}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['card', 'upi', 'netbanking'].map(method => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`p-3 border rounded-lg capitalize ${
                            paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          {method === 'card' ? '💳 Card' : method === 'upi' ? '📱 UPI' : '🏦 NetBanking'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className="p-3 border rounded-lg" />
                        <input type="text" placeholder="CVV" className="p-3 border rounded-lg" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <input type="text" placeholder="UPI ID (e.g., name@okhdfcbank)" className="w-full p-3 border rounded-lg" />
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setSelectedStudent(null);
                    }}
                    className="flex-1 py-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePay(selectedStudent.id)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Pay ₹{selectedStudent.amount.toLocaleString()}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Student Details Modal */}
        <AnimatePresence>
          {selectedStudent && !showPaymentModal && (
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
                  <p className="text-gray-500">Class {selectedStudent.class} • Roll No: {selectedStudent.rollNo}</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Fee Amount</span>
                    <span className="font-semibold">₹{selectedStudent.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Due Date</span>
                    <span>{selectedStudent.dueDate}</span>
                  </div>
                  {selectedStudent.paymentDate && (
                    <>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Payment Date</span>
                        <span>{selectedStudent.paymentDate}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Transaction ID</span>
                        <span className="font-mono text-sm">{selectedStudent.transactionId}</span>
                      </div>
                    </>
                  )}
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
    </div>
  );
}