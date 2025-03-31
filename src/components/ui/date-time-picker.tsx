"use client";

import { useState } from "react";
import { Input } from "./input";

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  minDate = new Date(),
  className = "",
}: DateTimePickerProps) {
  // Formatar a data para o input de data no formato YYYY-MM-DD
  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Formatar a hora para o input de hora no formato HH:MM
  const formatTimeForInput = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [dateValue, setDateValue] = useState(formatDateForInput(value));
  const [timeValue, setTimeValue] = useState(formatTimeForInput(value));

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    setDateValue(newDateStr);
    
    if (newDateStr) {
      const [year, month, day] = newDateStr.split('-').map(Number);
      const newDate = new Date(value);
      newDate.setFullYear(year);
      newDate.setMonth(month - 1); // Mês no JavaScript é 0-indexed
      newDate.setDate(day);
      
      onChange(newDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeStr = e.target.value;
    setTimeValue(newTimeStr);
    
    if (newTimeStr) {
      const [hours, minutes] = newTimeStr.split(':').map(Number);
      const newDate = new Date(value);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      
      onChange(newDate);
    }
  };

  // Garantir que a data mínima esteja no formato correto
  const minDateString = formatDateForInput(minDate);

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
          <Input
            type="date"
            value={dateValue}
            onChange={handleDateChange}
            min={minDateString}
            className="bg-[#2B2D3A] border-gray-700 text-white [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Hora</label>
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="bg-[#2B2D3A] border-gray-700 text-white [color-scheme:dark]"
          />
        </div>
      </div>
    </div>
  );
} 