import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { Calendar as CalendarIcon, Clock, Edit3, MapPin, Plus, Trash2, User, Filter } from 'lucide-react';
import { sampleDoctors } from '../data';

const DesktopView = ({
  selectedDate,
  setSelectedDate,
  getAppointmentsForDate,
  getPatientById,
  getDoctorById,
  openForm,
  deleteAppointment,
}) => {
  const [doctorFilter, setDoctorFilter] = useState('');
  const appointments = getAppointmentsForDate(selectedDate);

  // Filter appointments by doctor if filter is active
  const filteredAppointments = doctorFilter
    ? appointments.filter(app => app.doctorId === doctorFilter)
    : appointments;

  return (
    <div className="flex flex-col items-center justify-start p-6 min-h-screen">
      {/* Header */}
      <div className="w-full max-w-6xl mb-6 header-bg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Clinic Calendar</h1>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Today</div>
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

      {/* Main Content */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6 flex gap-6">
        {/* Calendar Section */}
        <div className="flex-[2]">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar w-full"
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const sameDayAppointments = getAppointmentsForDate(date);
                const filtered = doctorFilter 
                  ? sameDayAppointments.filter(app => app.doctorId === doctorFilter)
                  : sameDayAppointments;
                
                if (filtered.length > 0) {
                  const patients = filtered
                    .map((app) => {
                      const patient = getPatientById(app.patientId);
                      return patient?.name;
                    })
                    .filter(Boolean)
                    .slice(0, 2);

                  return (
                    <div className="text-[15px] text-gray-500 mt-1">
                      {patients.join(', ')}
                      {filtered.length > 2 && '...'}
                    </div>
                  );
                }
              }
              return null;
            }}
          />
        </div>

        {/* Appointments Section */}
        <div className="flex-[1] border-l border-gray-200 pl-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4 header-bg">
            <h3 className="text-lg font-semibold text-white">
              Appointments for {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => openForm(selectedDate)}
                className="add-btn"
              >
                <Plus className="icon-size-2" />
              </button>
            </div>
          </div>

          {/* Doctor Filter */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="icon-size text-gray-400" />
              </div>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="form-input outline-none border-2  border-green-500"
              >
                <option value="">All Doctors</option>
                {sampleDoctors?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((event) => {
                const patient = getPatientById(event.patientId);
                const doctor = getDoctorById(event.doctorId);

                return (
                  <div
                    key={event.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-between">
                      <div className="flex-1">
                        <div className="appointment-list mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <h4 className="font-semibold text-gray-800">Appointment</h4>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="appointment-list">
                            <Clock className="icon-size" />
                            <span>{event.time}</span>
                          </div>
                          <div className="appointment-list">
                            <User className="icon-size" />
                            <span>{patient?.name || 'Unknown'}</span>
                          </div>
                          <div className="appointment-list">
                            <User className="icon-size" />
                            <span className="font-medium text-blue-600">{doctor?.name || 'Unknown'}</span>
                          </div>
                          <div className="appointment-list">
                            <MapPin className="icon-size" />
                            <span>Clinic Room</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openForm(selectedDate, event)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Edit3 className="icon-size-2 text-gray-500" />
                        </button>
                        <button
                          onClick={() => deleteAppointment(event.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Trash2 className="icon-size-2 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>
                  {doctorFilter 
                    ? "No appointments for selected doctor"
                    : "No appointments scheduled"}
                </p>
                <button
                  onClick={() => openForm(selectedDate)}
                  className="mt-2 text-green-500 hover:text-green-600 text-sm font-medium"
                >
                  Add appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopView;