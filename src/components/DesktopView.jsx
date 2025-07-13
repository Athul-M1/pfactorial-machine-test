import { Calendar as CalendarIcon, Clock, Edit3, MapPin, Plus, Trash2, User } from "lucide-react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useState } from "react";

const DesktopView = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Sample events for demonstration
  const sampleEvents = [
    {
      id: 1,
      title: "Patient Consultation",
      time: "09:00 AM",
      location: "Room 101",
      attendees: ["Dr. Smith", "Patient A"],
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Medical Review",
      time: "11:30 AM",
      location: "Room 203",
      attendees: ["Dr. Johnson", "Nurse Mary"],
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Team Meeting",
      time: "02:00 PM",
      location: "Conference Room",
      attendees: ["Dr. Smith", "Dr. Johnson", "Nurse Mary"],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start p-6 min-h-screen ">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full max-w-6xl rounded-xl shadow-lg p-6 mb-6">
        <div className="flex-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Clinic Calendar</h1>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Today</div>
            <div className="text-lg font-semibold">
              {today.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Calendar and Events Side by Side */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6 flex gap-6">
        {/* Calendar */}
        <div className="flex-[2]">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar w-full"
          />
        </div>

        {/* Events List */}
        <div className="flex-[1] border-l border-gray-200 pl-6 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Events for {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <button
              onClick={() => {}}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Plus className="icon-size" />
            </button>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {sampleEvents.length > 0 ? (
              sampleEvents.map(event => (
                <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="appointment-class mb-2">
                        <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="appointment-class">
                          <Clock className="icon-size" />
                          <span>{event.time}</span>
                        </div>
                        <div className="appointment-class">
                          <MapPin className="icon-size" />
                          <span>{event.location}</span>
                        </div>
                        <div className="appointment-class">
                          <User className="icon-size" />
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Edit3 className="icon-size text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Trash2 className="icon-size text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No events scheduled for this day</p>
                <button
                  onClick={() => {}}
                  className="mt-2 text-green-500 hover:text-green-600 text-sm font-medium"
                >
                  Add your first event
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
