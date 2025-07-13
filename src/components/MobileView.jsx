import React from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
} from 'lucide-react';

const MobileView = ({
  selectedDate,
  setSelectedDate,
  getAppointmentsForDate,
  getPatientById,
  getDoctorById,
  openForm,
  deleteAppointment,
}) => {
  const appointments = getAppointmentsForDate(selectedDate);

  // Format date as YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-6 p-4 max-h-screen ">
        <div className="w-full max-w-6xl mb-6 header-bg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-lg font-bold">Clinic Calendar</h1>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-80">Today</div>
            <div className="text-lg font-semibold">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Date Navigator */}
      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
        <div className="flex-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={(e) => {
            const date = new Date(e.target.value);
            date.setHours(12); // Avoid timezone issues
            setSelectedDate(date);
          }}
          className="form-input"
        />
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">
            {selectedDate.toDateString() === new Date().toDateString()
              ? "Today's Appointments"
              : "Appointments"}
          </h3>
          <button
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            onClick={() => openForm(selectedDate)}
            aria-label="Add appointment"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {appointments.length > 0 ? (
            appointments.map((event) => {
              const patient = getPatientById(event.patientId);
              const doctor = getDoctorById(event.doctorId);

              return (
                <div
                  key={event.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <Clock size={16} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 truncate">
                        {patient?.name || 'Unknown Patient'}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {doctor?.name || 'Unknown Doctor'}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {event.time}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        Clinic Room
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => openForm(selectedDate, event)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                      aria-label="Edit appointment"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteAppointment(event.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      aria-label="Delete appointment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No appointments scheduled</p>
              <button
                onClick={() => openForm(selectedDate)}
                className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Add your first appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileView;