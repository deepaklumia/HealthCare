import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatientStore } from '../store';
import { useNotifications } from '../hooks/useNotifications';
import StatusBadge from '../components/ui/StatusBadge';
import { ArrowLeft, Mail, Phone, User, Stethoscope, Calendar, Bell } from 'lucide-react';

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { patients } = usePatientStore();
  const navigate = useNavigate();
  const { sendNotification } = useNotifications();

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Patient not found.</p>
        <button onClick={() => navigate('/patients')} className="mt-3 text-blue-600 hover:underline text-sm">
          Back to Patients
        </button>
      </div>
    );
  }

  const infoItems = [
    { icon: User, label: 'Age', value: `${patient.age} years` },
    { icon: User, label: 'Gender', value: patient.gender },
    { icon: Stethoscope, label: 'Condition', value: patient.condition },
    { icon: User, label: 'Doctor', value: patient.doctor },
    { icon: Calendar, label: 'Last Visit', value: patient.lastVisit },
    { icon: Mail, label: 'Email', value: patient.email },
    { icon: Phone, label: 'Phone', value: patient.phone },
  ];

  return (
    <div className="p-6 space-y-5 max-w-3xl">
      <button
        onClick={() => navigate('/patients')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Patients
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-500 text-sm">Patient ID: #{patient.id.padStart(4, '0')}</p>
              <div className="mt-1.5">
                <StatusBadge status={patient.status} />
              </div>
            </div>
          </div>
          <button
            onClick={() => sendNotification(`Alert: ${patient.name}`, `${patient.condition} - Requires attention`)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Bell size={15} />
            Send Alert
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="bg-white p-1.5 rounded-md shadow-sm">
                <Icon className="text-blue-500" size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status-specific alert */}
      {patient.status === 'Critical' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-red-100 p-1.5 rounded-full mt-0.5">
            <Bell className="text-red-600" size={16} />
          </div>
          <div>
            <p className="font-semibold text-red-800 text-sm">Critical Status Alert</p>
            <p className="text-red-600 text-xs mt-0.5">
              This patient requires immediate medical attention. Please contact {patient.doctor} immediately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
