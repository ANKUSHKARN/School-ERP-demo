'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DemoSelection() {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = `/demo/${role}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏫</div>
          <h2 className="text-2xl font-bold text-gray-800">Smart School ERP</h2>
          <p className="text-gray-500 text-sm">Secure Login Portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="fees">Fee Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-500">Quick Demo Links:</p>
          <div className="flex justify-center gap-3 mt-3">
            <Link href="/demo/admin" className="text-xs text-blue-600 hover:underline">Admin</Link>
            <Link href="/demo/teacher" className="text-xs text-blue-600 hover:underline">Teacher</Link>
            <Link href="/demo/parent" className="text-xs text-blue-600 hover:underline">Parent</Link>
            <Link href="/demo/fees" className="text-xs text-blue-600 hover:underline">Fee Manager</Link>
          </div>
        </div>
      </div>
    </div>
  );
}