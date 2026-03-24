import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../store';
import StatusBadge from '../components/ui/StatusBadge';
import ViewToggle from '../components/ui/ViewToggle';
import { Search, User } from 'lucide-react';

export default function PatientsPage() {
  const { patients, viewMode, searchQuery, setViewMode, setSearchQuery } = usePatientStore();
  const navigate = useNavigate();

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-500 text-sm mt-0.5">{filtered.length} patients found</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.age} yrs · {patient.gender}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{patient.condition}</p>
              <p className="text-xs text-gray-400 mb-3">{patient.doctor}</p>
              <div className="flex items-center justify-between">
                <StatusBadge status={patient.status} />
                <span className="text-xs text-gray-400">{patient.lastVisit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Age / Gender</th>
                  <th className="px-4 py-3 font-medium">Condition</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Last Visit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 p-1.5 rounded-full">
                          <User className="text-blue-600" size={14} />
                        </div>
                        <span className="font-medium text-gray-900">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{patient.age} / {patient.gender}</td>
                    <td className="px-4 py-3 text-gray-600">{patient.condition}</td>
                    <td className="px-4 py-3 text-gray-600">{patient.doctor}</td>
                    <td className="px-4 py-3 text-gray-500">{patient.lastVisit}</td>
                    <td className="px-4 py-3"><StatusBadge status={patient.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">No patients found</div>
          )}
        </div>
      )}
    </div>
  );
}
