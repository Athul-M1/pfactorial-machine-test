import { Calendar as CalendarIcon } from "lucide-react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const DesktopView = () => {
  const today = new Date();

  return (
    <div className="  flex flex-col items-center justify-start p-6 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full max-w-full rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          {/* Left - Title */}
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Clinic Calendar</h1>
          </div>

          {/* Right - Today */}
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
      {/* Calendar */}
      <div className=" bg-white rounded-xl shadow-md p-4">
        <Calendar className="custom-calendar w-full" />
      </div>
    </div>
  );
};

export default DesktopView;
