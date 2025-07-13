import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { sampleDoctors, samplePatients } from '../data';

const Modal = ({ isOpen, onClose, onSave, selectedDate, editData }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    time: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        patientId: editData.patientId,
        doctorId: editData.doctorId,
        time: editData.time,
      });
    } else {
      setFormData({
        patientId: '',
        doctorId: '',
        time: '',
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId || !formData.time) {
      alert('Please fill all fields');
      return;
    }

    onSave({
      ...formData,
      id: editData?.id || Date.now(),
      date: selectedDate.toISOString().split('T')[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div className="flex-between">
          <h2 className="text-lg font-semibold">
            {editData ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          <button onClick={onClose}>
            <X className="icon-size-2 text-gray-600 hover:text-red-500 transition" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Patient</label>
            <select
              name="patientId"
              required
              value={formData.patientId}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Patient</option>
              {samplePatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Doctor</label>
            <select
              name="doctorId"
              required
              value={formData.doctorId}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Doctor</option>
              {sampleDoctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Time</label>
            <input
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            {editData ? 'Update' : 'Add'} Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;