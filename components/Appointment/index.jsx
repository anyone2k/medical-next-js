"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession} from "next-auth/react";

const AppointmentForm = ({selectedId , doctors}) => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState(30);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  useEffect(() => {

  }, []);

  const handleSubmit = async () => {

    try {
      const response = await axios.post('http://localhost:10999/api/v1/appointment', {
        "patientId": session.user._id,
        "doctorId": doctors[selectedId]._id,
        "dayTime": date,
        "duration": duration,
        "reason": reason
      });

      setMessage('Rendez-vous créé avec succès !');
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
      setMessage(error.response?.data?.message || 'Une erreur s\'est produite.');
    }
  };

  const minTime = "08:00";
  const maxTime = "18:00";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Prendre un Rendez-vous</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
            Docteur
          </label>
          <div>
          Dr. {doctors[selectedId].fullName.firstName} {doctors[selectedId].fullName.lastName}
          </div>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <input
           type="datetime-local"
           id="date"
           value={date}
           onChange={(e) => setDate(e.target.value)}
           required
           min={`${date.slice(0, 10)}T${minTime}`}
           max={`${date.slice(0, 10)}T${maxTime}`}
           className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Durée (en minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            min={15}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Raison
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <button

          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Prendre Rendez-vous
        </button>

        {message && <p className="text-red-600 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
