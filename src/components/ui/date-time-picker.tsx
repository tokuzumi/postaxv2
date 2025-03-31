"use client";

import { useState, useEffect } from "react";
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
    // Garantir que estamos trabalhando com uma data válida
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Data inválida:", date);
      date = new Date(); // Fallback para data atual
    }
    
    // Obtendo componentes no fuso horário local
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque getMonth() retorna 0-11
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Formatar a hora para o input de hora no formato HH:MM
  const formatTimeForInput = (date: Date): string => {
    // Garantir que estamos trabalhando com uma data válida
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Data inválida para formatação de hora:", date);
      date = new Date(); // Fallback para data atual
    }
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [dateValue, setDateValue] = useState(formatDateForInput(value));
  const [timeValue, setTimeValue] = useState(formatTimeForInput(value));

  // Atualizar os valores dos campos quando o valor da prop mudar
  useEffect(() => {
    console.log("DateTimePicker recebeu nova data:", value);
    setDateValue(formatDateForInput(value));
    setTimeValue(formatTimeForInput(value));
  }, [value]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    setDateValue(newDateStr);
    
    if (newDateStr) {
      try {
        const [year, month, day] = newDateStr.split('-').map(Number);
        console.log('Data selecionada no input:', { year, month, day });
        
        const newDate = new Date(value);
        newDate.setFullYear(year);
        newDate.setMonth(month - 1); // Mês no JavaScript é 0-indexed
        newDate.setDate(day);
        
        console.log('Nova data após alteração:', newDate);
        console.log('Componentes da nova data:', {
          year: newDate.getFullYear(),
          month: newDate.getMonth() + 1,
          day: newDate.getDate(),
          hours: newDate.getHours(),
          minutes: newDate.getMinutes()
        });
        
        onChange(newDate);
      } catch (error) {
        console.error("Erro ao processar a data:", error);
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeStr = e.target.value;
    setTimeValue(newTimeStr);
    
    if (newTimeStr) {
      try {
        const [hours, minutes] = newTimeStr.split(':').map(Number);
        const newDate = new Date(value);
        
        console.log("Componentes da hora:", { hours, minutes });
        
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        
        console.log("Nova data após alteração de hora:", newDate);
        
        onChange(newDate);
      } catch (error) {
        console.error("Erro ao processar a hora:", error);
      }
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