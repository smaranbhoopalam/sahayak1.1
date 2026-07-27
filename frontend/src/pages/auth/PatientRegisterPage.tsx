import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { User, Mail, Phone, Calendar, Building, Key, Stethoscope, UserCheck, ChevronLeft } from 'lucide-react';
import { useAuthMock } from '../../hooks/useAuthMock';

export const PatientRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { changeRole } = useAuthMock();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    hospital: '',
    doctorCode: '',
    condition: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeRole('patient');
    navigate('/onboarding');
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
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20 mb-3">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Patient Registration</h2>
          <p className="text-sm text-slate-500 mt-1">Enroll in Sahayak for post-operative recovery tracking</p>
        </div>

        <Card bordered className="bg-white shadow-soft p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={<User className="w-4 h-4" />}
                placeholder="e.g. Rahul Sharma"
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail className="w-4 h-4" />}
                placeholder="e.g. rahul.sharma@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={<Phone className="w-4 h-4" />}
                placeholder="e.g. +91 98765 43210"
                required
              />
              <Input
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                icon={<Calendar className="w-4 h-4" />}
                placeholder="e.g. 42"
                required
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Hospital / Clinic"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                icon={<Building className="w-4 h-4" />}
                placeholder="e.g. AIIMS New Delhi"
                required
              />
              <Input
                label="Doctor Code"
                name="doctorCode"
                value={formData.doctorCode}
                onChange={handleChange}
                icon={<Key className="w-4 h-4" />}
                placeholder="e.g. DOC-8842"
                required
              />
            </div>

            <Input
              label="Surgical Procedure / Condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              icon={<Stethoscope className="w-4 h-4" />}
              placeholder="e.g. Post-ACL Reconstruction"
              required
            />

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                icon={<UserCheck className="w-5 h-5" />}
              >
                Next
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
