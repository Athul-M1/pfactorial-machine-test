import React, { useEffect, useState } from 'react';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import Modal from './Modal';
import { sampleDoctors, samplePatients } from '../data';

const CalendarView = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load appointments from localStorage
  useEffect(() => {
    const loadAppointments = () => {
      try {
        const data = localStorage.getItem('appointments');
        if (data) {
          setAppointments(JSON.parse(data));
          console.log('Loaded appointments:', JSON.parse(data));
        }
      } catch (error) {
        console.error('Failed to load appointments:', error);
      }
    };
    loadAppointments();
  }, []);

  // Format date as YYYY-MM-DD
  const formatDateKey = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const openForm = (date, appointment = null) => {
    setSelectedDate(date);
    setEditData(appointment);
    setIsFormOpen(true);
  };

  const handleSaveAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      date: formatDateKey(appointment.date || selectedDate),
    };

    setAppointments(prev => {
      const updated = editData
        ? prev.map(a => a.id === newAppointment.id ? newAppointment : a)
        : [...prev, { ...newAppointment, id: Date.now() }];
      
      // Save to localStorage immediately
      localStorage.setItem('appointments', JSON.stringify(updated));
      console.log('Saved appointments:', updated);
      return updated;
    });

    setIsFormOpen(false);
    setEditData(null);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem('appointments', JSON.stringify(updated));
      return updated;
    });
  };

  const getAppointmentsForDate = (date) => {
    const key = formatDateKey(date);
    return appointments.filter(app => app.date === key);
  };

  const getPatientById = (id) => samplePatients.find(p => p.id === id);
  const getDoctorById = (id) => sampleDoctors.find(d => d.id === id);

  return (
    <div className="container min-w-full">
      <div className="max-w-6xl mx-auto">
        {isMobile ? (
          <MobileView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getAppointmentsForDate={getAppointmentsForDate}
            getPatientById={getPatientById}
            getDoctorById={getDoctorById}
            openForm={openForm}
            deleteAppointment={handleDeleteAppointment}
          />
        ) : (
          <DesktopView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            getAppointmentsForDate={getAppointmentsForDate}
            getPatientById={getPatientById}
            getDoctorById={getDoctorById}
            openForm={openForm}
            deleteAppointment={handleDeleteAppointment}
          />
        )}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditData(null);
        }}
        onSave={handleSaveAppointment}
        selectedDate={selectedDate}
        editData={editData}
      />
    </div>
  );
};

export default CalendarView;