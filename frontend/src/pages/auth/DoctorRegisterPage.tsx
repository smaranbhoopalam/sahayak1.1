import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { User, Mail, Building, Stethoscope, Award, FileBadge, ChevronLeft } from 'lucide-react';
import { useAuthMock } from '../../hooks/useAuthMock';

export const DoctorRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { changeRole } = useAuthMock();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hospital: '',
    department: '',
    specialization: '',
    registrationNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeRole('doctor');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 py-10">
      <div className="w-full max-w-xl space-y-6">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20 mb-3">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Doctor Registration</h2>
          <p className="text-sm text-slate-500 mt-1">Join Sahayak as a clinical provider to monitor post-op patients</p>
        </div>

        <Card bordered className="bg-white shadow-soft p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name (with Title)"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={<User className="w-4 h-4" />}
                placeholder="e.g. Dr. Ananya Roy"
                required
              />
              <Input
                label="Hospital Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4" />}
                placeholder="e.g. ananya.roy@aiims.edu.in"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Hospital / Medical Center"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                icon={<Building className="w-4 h-4" />}
                placeholder="e.g. AIIMS New Delhi"
                required
              />
              <Input
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                icon={<Stethoscope className="w-4 h-4" />}
                placeholder="e.g. Orthopedics & Traumatology"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Clinical Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                icon={<Award className="w-4 h-4" />}
                placeholder="e.g. Joint Replacement & Sports Medicine"
                required
              />
              <Input
                label="Medical Reg Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                icon={<FileBadge className="w-4 h-4" />}
                placeholder="e.g. MCI-2012-984321"
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                icon={<Stethoscope className="w-5 h-5" />}
              >
                Register & Open Doctor Portal
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
