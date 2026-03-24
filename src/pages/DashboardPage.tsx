import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../store';
import { useNotifications } from '../hooks/useNotifications';
import StatusBadge from '../components/ui/StatusBadge';
import { Users, Calendar, TrendingUp, AlertTriangle, Bell } from 'lucide-react';

export default function DashboardPage() {
  const { patients } = usePatientStore();
  const { sendNotification } = useNotifications();
  const navigate = useNavigate();

  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.status === 'Active').length,
    critical: patients.filter((p) => p.status === 'Critical').length,
    appointments: 24,
  };

  useEffect(() => {
    // Show a welcome notification on dashboard load
    const timer = setTimeout(() => {
      sendNotification('HealthCare Dashboard', `You have ${stats.critical} critical patients requiring attention.`);
    }, 2000);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  const statCards = [
    { label: 'Total Patients', value: stats.total, icon: Users, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Patients', value: stats.active, icon: TrendingUp, color: 'bg-green-500', bg: 'bg-green-50' },
    { label: 'Critical Cases', value: stats.critical, icon: AlertTriangle, color: 'bg-red-500', bg: 'bg-red-50' },
    { label: "Today's Appointments", value: stats.appointments, icon: Calendar, color: 'bg-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here's what's happening today.</p>
        </div>
        <button
          onClick={() => sendNotification('Test Notification', 'Push notifications are working!')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Bell size={16} />
          Test Notification
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <div className={`${bg} p-2 rounded-lg`}>
                <Icon className={`${color.replace('bg-', 'text-')}`} size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent Critical Patients */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Critical Patients</h2>
          <button onClick={() => navigate('/patients')} className="text-blue-600 text-sm hover:underline">View all</button>
        </div>
        <div className="space-y-3">
          {patients.filter((p) => p.status === 'Critical').map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                <p className="text-xs text-gray-500">{patient.condition} · {patient.doctor}</p>
              </div>
              <StatusBadge status={patient.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Recent Patients</h2>
          <button onClick={() => navigate('/patients')} className="text-blue-600 text-sm hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Condition</th>
                <th className="pb-2 font-medium">Doctor</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.slice(0, 5).map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2.5 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-2.5 text-gray-600">{patient.condition}</td>
                  <td className="py-2.5 text-gray-600">{patient.doctor}</td>
                  <td className="py-2.5"><StatusBadge status={patient.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
