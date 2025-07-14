
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface SelectDateTimeProps {
  onNext: () => void;
  onBack: () => void;
  onSelect: (dateTime: { date: string; time: string }) => void;
  selected?: { date: string; time: string };
  provider?: any;
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

const SelectDateTime = ({ onNext, onBack, onSelect, selected, provider }: SelectDateTimeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    selected?.date ? new Date(selected.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(selected?.time);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      onSelect({
        date: date.toISOString().split('T')[0],
        time: selectedTime
      });
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      onSelect({
        date: selectedDate.toISOString().split('T')[0],
        time: time
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-cabinet">
            Select Date & Time
          </h1>
          <p className="text-sm text-gray-600 font-cabinet">
            {provider ? `With ${provider.name}` : 'Choose your appointment slot'}
          </p>
        </div>
      </div>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900 font-cabinet">
              Select Date
            </h3>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-md border-0"
          />
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 font-cabinet">
                Available Times
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimeSelect(time)}
                  className="font-cabinet text-sm py-2"
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 font-cabinet">
                More times available? <button className="text-blue-600 underline">View all slots</button>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="pt-6">
        <Button 
          onClick={onNext} 
          disabled={!selectedDate || !selectedTime}
          className="w-full font-cabinet rounded-full py-6 text-base"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectDateTime;
